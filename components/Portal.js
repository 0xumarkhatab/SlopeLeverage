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
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import { ethers } from "ethers";

async function connectWallet() {
  let ethprovider = await window.ethereum;
  if (!ethprovider) {
    return 1; // no metamask
    0;
  }
  console.log({ ethprovider });
  const provider = new ethers.providers.Web3Provider(ethprovider);
  const signer = provider.getSigner();
  return signer;
}

function Portal() {
  const [currentTokenPrice, setCurrentTokenPrice] = useState(1.0);
  const [balance, setBalance] = useState(10);
  const [connectedAddress, setConnectAddress] = useState(null);

  async function getTokenPrice() {
    let signer = await connectWallet();
    let contract = new ethers.Contract(contractAddress, abi, signer);
    let Price = await contract.getTokenPrice();
    setCurrentTokenPrice(Price);
  }
  async function updateBalance() {
    let signer = await connectWallet();
    let contract = new ethers.Contract(contractAddress, abi, signer);
    let Price = await contract.balanceOf(connectedAddress);
    setBalance(Price);
  }

  async function handleBuy() {
    let signer = await connectWallet();
    try {
      let contract = new ethers.Contract(contractAddress, abi, signer);
      let response = await contract.buyToken({
        value: ethers.utils.parseEther(currentTokenPrice.toString()),
      });

      await response.wait();
      alert("Token Purchased Successfully 🎉");
      getTokenPrice();
      updateBalance();
    } catch (e) {
      alert("Transaction Un-Successful ! ");
    }
  }
  async function handleSell() {
    let signer = await connectWallet();
    try {
      let contract = new ethers.Contract(contractAddress, abi, signer);
      let response = await contract.sellToken();
      await response.wait();
      alert("Token Sold Successfully 🎉");
      getTokenPrice();
      updateBalance();
    } catch (e) {
      alert("Transaction Un-Successful ! ");
    }
  }

  async function connect() {
    let signer = await connectWallet();
    if ((signer = 1)) {
      alert("Please install metamask");
    }
  }

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
              <Button colorScheme={"cyan"}>Balance : {balance}</Button>
              <Button colorScheme={"telegram"}>
                <Text>Latest Price : </Text>
                <Text marginLeft={2}> {currentTokenPrice} </Text>
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
    </Center>
  );
}

export default Portal;
