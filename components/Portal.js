import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Img,
  Stack,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Fade,
  ScaleFade,
  Slide,
  SlideFade,
} from "@chakra-ui/react";

import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "../components/SmartContract";
import { parseEther } from "ethers/lib/utils";
import { createCipheriv, sign } from "crypto";

async function getFeesForMumbai() {
  // get max fees from gas station
  let maxFeePerGas = ethers.BigNumber.from(40000000000); // fallback to 40 gwei
  let maxPriorityFeePerGas = ethers.BigNumber.from(40000000000); // fallback to 40 gwei
  try {
    const { data } = await axios({
      method: "get",
      url: "https://gasstation-mumbai.matic.today/v2",
    });
    const marginalFee = ethers.BigNumber.from(40000000000);
    maxFeePerGas = ethers.utils.parseUnits(
      Math.ceil(data.fast.maxFee) + marginalFee + "",
      "gwei"
    );
    maxPriorityFeePerGas = ethers.utils.parseUnits(
      Math.ceil(data.fast.maxPriorityFee) + marginalFee + "",
      "gwei"
    );
  } catch {
    // ignore
  }

  return {
    maxFeePerGas,
    maxPriorityFeePerGas,
  };
}

async function connectWallet() {
  let ethProvider = await window.ethereum;
  if (ethProvider) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      return signer;
    } catch (error) {
      console.log(error);
    }
  } else {
    return 1;
  }
}

async function getContract(setter) {
  let signer = await connectWallet();
  if (!signer) return;
  let contract = new ethers.Contract(contractAddress, abi, signer);
  if (setter) setter(contract);
  return contract;
}
function Portal() {
  const [currentTokenPrice, setCurrentTokenPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [connectedAddress, setConnectAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const contractAllowance = useRef(0);
  const [alertUser, setAlertUser] = useState(null);

  async function getTokenPrice() {
    if (!contract) {
      await getContract(setContract);
      return null;
    }
    try {
      let Price = await contract.getTokenPrice();
      Price = parseFloat(Price / parseEther("1"), 3).toString();
      setCurrentTokenPrice(Price);
    } catch (e) {
      console.log(e);
    }
  }
  async function updateBalance() {
    if (!contract) {
      await getContract(setContract);
      return null;
    }
    try {
      let balance = await contract.balanceOf(connectedAddress);
      balance = parseInt(balance);
      setBalance(balance);
    } catch (e) {
      console.log(e);
    }
  }

  async function getContractAllowance() {
    if (!contract) {
      await getContract(setContract);
      return null;
    }
    try {
      let allowance = await contract.allowance(
        connectedAddress,
        contractAddress
      );
      contractAllowance.current = parseInt(allowance);
    } catch (e) {
      console.log(e);
    }
  }

  async function ApprovePlatform() {
    setAlertUser({
      type: "info",
      message: "Allowing Smart contract to trade the Tokens !",
    });
    if (!contract) {
      await getContract(setContract);
      return null;
    }
    console.log("approve");
    let feeObject = await getFeesForMumbai();
    let tx = await contract.approve(contractAddress, 1, feeObject);
    console.log({ tx });
    setAlertUser({
      type: "warning",
      message: "Approving Platform, Just a second :) ",
    });
    contractAllowance.current = 1;
    setAlertUser({
        type: "success",
        message: "Platform has been guarenteed the access ! 🎉\nSell after 3 seconds",
      });
    vanishAlert();
    
  }

  async function handleBuy() {
    if (!contract) {
      await getContract(setContract);
      return null;
    }

    try {
      setAlertUser({
        type: "info",
        message: "Please sign the Transaction!",
      });

      let feeObject = await getFeesForMumbai();

      let response = await contract.buyToken({
        value: ethers.utils.parseEther(currentTokenPrice.toString()),
        maxFeePerGas: feeObject.maxFeePerGas,
        maxPriorityFeePerGas: feeObject.maxPriorityFeePerGas,
      });
      setAlertUser({
        type: "info",
        message: "Waiting for Blockchain confirmation for your ownership",
      });

      await response.wait();
      await getTokenPrice();
      await updateBalance();

      setAlertUser({
        type: "success",
        message: "Token Purchased Successfully 🎉",
      });
      vanishAlert();
    } catch (e) {
      console.log(e);
      setAlertUser({
        type: "error",
        message: "Transaction Un-Successful :/ ",
      });
      vanishAlert();
    }
  }
  async function handleSell() {
    if (!contract) {
      await getContract(setContract);
      return null;
    }

    try {
      console.log({contractAllowance});
      if (contractAllowance.current === 0) {
        setAlertUser({
          type: "warning",
          message: "Allow Platform to trade your tokens first!",
        });
        await ApprovePlatform();
        vanishAlert();
        return null;
      }
      setAlertUser({
        type: "warning",
        message: "Please sign the transaction !",
      });

      let feeObject = await getFeesForMumbai();

      let response = await contract.sellToken({
        value: ethers.utils.parseEther("0"),
        maxFeePerGas: feeObject.maxFeePerGas,
        maxPriorityFeePerGas: feeObject.maxPriorityFeePerGas,
      });
      setAlertUser({
        type: "info",
        message: "Waiting for transaction completion!",
      });

      await response.wait();
      await getTokenPrice();
      await updateBalance();
      setAlertUser({
        type: "success",
        message: "Token Sold Successfully 🎉",
      });
      vanishAlert();
    } catch (e) {
      console.log(e);
      setAlertUser({
        type: "error",
        message: "Transaction Un-Successful :/",
      });
    }
  }

  async function vanishAlert() {
    setTimeout(() => {
      setAlertUser(null);
    }, 3000);
  }
  async function connect() {
    let signer = await connectWallet();
    if (signer == 1) {
      alert("Please install metamask");
    } else {
      if (!signer) return;
      let adr = await signer.getAddress();
      setConnectAddress(adr);
    }
  }

  useEffect(() => {
    if (!connectedAddress) {
      connect();
    } else {
      try {
        getContract(setContract);
        updateBalance();
        getTokenPrice();
        getContractAllowance();
      } catch (e) {
        console.log(e);
      }
    }
  }, [connectedAddress, contract]);

  return (
    <Center>
      {!connectedAddress ? (
        <VStack height={"50vh"} justify={"center"}>
          <Button colorScheme={"blue"} onClick={connect}>
            Connect wallet
          </Button>
        </VStack>
      ) : (
        <Box
          boxShadow={"2px 2px 2px 2px black"}
          bg={"black"}
          color={"white"}
          padding={"10vw"}
          marginTop={"20px"}
          marginBottom={"10vh"}
          borderRadius={"20px"}
        >
          <VStack spacing={10}>
            <Center>
              <VStack>
                <Heading>Slope Leverage</Heading>
                <VStack align={"left"}>
                  <Text>Buy SLPLEV Tokens Early</Text>
                  <Text>Sell at high prices</Text>
                </VStack>
              </VStack>
            </Center>
            <Stack direction={["column", "column", "row"]} spacing={5}>
              <Button colorScheme={"cyan"}>
                Balance : {balance != null ? balance : "Fetching.."}
              </Button>
              <Button colorScheme={"telegram"}>
                <Text>Latest Price : </Text>
                <Text marginLeft={2}>
                  {" "}
                  {currentTokenPrice ? currentTokenPrice : "Fetching.."}{" "}
                </Text>
                <Img
                  marginLeft={2}
                  width={4}
                  src={
                    "https://s3.coinmarketcap.com/static/img/portraits/628f8aa5cf1b0f58d5151191.png"
                  }
                />
              </Button>
            </Stack>
            <Center>
              <Stack direction={["column", "column", "row"]} spacing={5}>
                <Button colorScheme={"green"} onClick={handleBuy}>
                  Buy Token
                </Button>
                <Button
                  colorScheme={"gray"}
                  color={"black"}
                  onClick={handleSell}
                >
                  Sell Token
                </Button>
              </Stack>
            </Center>
          </VStack>
        </Box>
      )}

      {alertUser && (
        <Fade in={alertUser != null}>
          <Box position={"absolute"} top={"0"} right={"0"}>
            <Alert status={alertUser.type} variant="solid">
              <AlertIcon />
              {alertUser.message}
            </Alert>
          </Box>
        </Fade>
      )}
    </Center>
  );
}

export default Portal;
