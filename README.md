# Slope Leverage - DeFi Dapp 
![image](https://user-images.githubusercontent.com/71306738/208593841-45f03820-1441-4245-8d72-3002a0ed57a8.png)

## Purpose 
A DeFi platform that uses a Linear Bonding curve at its core to buy and sell tokens.
Essentially a Decentralized Trading platform ( Mini Version ).

## How Does It Works ( Big Picture )?
The person who buys tokens first and holds them for some time can sell them at higher prices.

After each purchase, the token price `increases` by 1 MATIC.
After each Sell, the token price `drops` by 1 MATIC.
So you have to be a clever player.

## DeFi concepts that you will learn
    
    ✔ Tokenization
    ✔ ERC20
    ✔ Linear Bonding Curve
    ✔ Investment
    ✔ Holding Strategies

## Tech Stack
This is a Fullstack Dapp that utilizes the following stack

    ✅ Next JS     - As a frontend development framework
    ✅ Chakra UI   - A Library for premade frontend components and styling
    ✅ Remix IDE   - An Online compiler for compiling and deploying our Smart contract
    ✅ Solidity    - The language for writing our smart contract
    ✅ Polygon     - The fastest and cheapest EVM blockchain to build upon.
    ✅ Metamask    - Our crypto wallet for the Purchase and Selling of our tokens.
    

## Tutorial ( How to make one ? )
This tutorial will guide you on how to build a Slope Leverage app by yourself.

## Pre-requisite

-   Install VSCode
-   Install and Configure Metamask
-   Install Node JS
-   Basic understanding of how a React or Next JS work

With all set, let's start it up.

### Creating a Next App

First of all, We need a `Next Js app` in which we will do everything on our own!
so 

        Create a new folder
        Open that in vscode
        Open your terminal by pressing ``` CTRL + ` ``` on your keyboard
        write "npx create-next-app slope_leverage" in the terminal
        Allow ( tap "y" ) for every step except installing Typescript, we will just be working in javascript.
        Let everything install.
        Test the demo app by writing ` npm run dev ` in the terminal.
        Visit localhost:3000 and you can see the demo app running.
        Congratulations on setting up the app 🎉
        
#### Cleaning the app
In the `pages` directory, open the `index.js` file and remove everything in the body of Home after the return statement. <br/>
So your `index.js` will look something like this 


```javascript

export default function Home() {
  return (
    <>
    
    </>
  )
}

```

Now Let's write a heading of our favorite starter `hello world` as 

```javascript
<h1>Hello World</h1> 

```

Navigate to localhost:3000 and see if you can see the Hello world. <br/>
If you can, great, you have completed the second step and we will move forward 

### Smart contract Creation
So, now pause the frontend development here, and let's create a smart contract for our platform first.

#### Pre-requisite
        
1. Metamask installed <br/>
2. Polygon mumbai testnet is configured on metamask <br/>
( if you have not configured it yet,  Visit [this Article](https://medium.com/stakingbits/how-to-connect-polygon-mumbai-testnet-to-metamask-fc3487a3871f))
3. Get some test Matic from the faucet [here](https://faucet.polygon.technology/), it will give you half of a matic .
4. These MATIC are not sufficient for our project , you can ask some friend or your brother Umar Khatab for it. <br/> Right now i have 10 , tag me on twitter or linked as `@umarkhatab465` and i will transfer you some MATIC.
5. Transfer my matic back after testing


So , with all the pre-requisites set , we now move to the smart contract creation.

1. Vist [Remix IDE Online](https://remix.ethereum.org/) 
2. Create a solidity file in `contracts` folder named `SlopeLeverage.sol`.
3. Copy the code from [here](https://github.com/umaresso/SlopeLeverage/blob/main/SlopeLeverage.sol) and paste in there.
4. Look the code for a while and then move to the next section of the tutorial

#### Understanding the Solidity code

So , Let's start it up !
```solidity

//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

```
If you wrote any solidity code before , you would know what it is but i will explain here even if you are not . <br/>
```solidity
//SPDX-License-Identifier: Unlicense

```
the above line defines that this code is licenced to nothing and anyone can use it .
```solidity
pragma solidity 0.8.7;

```
This line just tells the Remix IDE that our compiler uses relatively latest compiler version that is   `0.8.7`

Nothing special yet :/

But Let's move forward.

```solidity

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

```

Here we are importing the premade ERC20 Token standard for our platform so we don not have to implement everything by ourselves :)  <br/>

You can check out [Open Zeppelin's Documentation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC20Burnable.sol) for more details

##### Point to Note
Note that , here we are implementing ERC20 Burnable because essentially we have to `burn` the tokens after user `sell` their tokens <br/> and `mint` new tokens when the user `Buys` it.


```solidity
contract SlopeLeverage is ERC20Burnable {
    uint256 public slope;
    uint256 public baseFee;
    uint256 public tokenNumber;
    address public owner;

    constructor(uint256 _slope, uint256 _baseFee)
        ERC20Burnable()
        ERC20("SlopeLeverage", "SLPLEV")
    {
        owner = msg.sender;
        tokenNumber = 0;
        slope = _slope;
        baseFee = _baseFee;
    }

```
Here we are declaring our smart contract with a name , and declaring some variables as contract properties.<br/>
For Understanding these variables , let's understand the important concept of `Linear Bonding curve`  <br/>

### Linear Bonding Curve

![bonding curve_1](https://user-images.githubusercontent.com/71306738/208885229-a614b945-afac-4890-b2a2-4e8764312812.png)

This image illustrates the process by which the price of tokens increases as more tokens are created.

So essentially, we are using a simple Slope formula here ( recall calculus for straight lines if you have studied before) <br/>

The formula is here

``` javascript
y=mx+b

```

where `x` is the Number of tokens created, `m` is the slope whose value for the linear curve is `1` and `b` is the base fee for the token.

So the equation becomes something like this

New_Token_Price = Slope * Tokens_Created + Base_Fee;

#### Heading into mathematical calculations
let's say the price of a token is 1 Ethereum at first, the slope being `1`, and initially the tokens created are `0` so

`Base_FEE = 1 ETH`,
`Slope=1`,
`Tokens_Created=0`
Then the price for the first token is

price = 1*0+1 ETH = 1 ETH.

Then the price for the second token is

price = 1*1+1 ETH = 2 ETH.

Then the price for the third token is

price = 1*2+1 ETH = 3 ETH.

Let's say Seemal buys 5 tokens at first paying 1+2+3+4+5=15 ETH to the smart contract

Raida comes in and buys 5 tokens too but the price has reached 6 ETH now ( remember from the formula). <br/>
She will be paying 6+7+8+9+10 = 40 ETH.

Notice the price variation for both of the buyers, the same amount of tokens but who comes first buys cheap. <br/>


But here comes the interesting part, if Seemal wants to sell her 5 tokens , she will earn more . <br/>

How ?
The total tokens right now are 10 and starting from 0 , the tokens generated are 9 (0 to 9 are 10).

See , the first token will be sold at `price = 1*9+1 ETH = 10 ETH`  and this token will be burned means vanish from blockchain like it has not ever created even.<br/>

Second token will be sold at `price = 1*8+1 ETH = 9 ETH`  and this token will be burned too .

Third token ar 8 , fourth at 7 and fifth token at 6 ETH .

So essentially Seemal will sell these tokens for 10+9+8+7+6 = 40 ETH 😲 but she bought it for just 15 ETH <br/>

She will earn the profit of 40-15 = 25 huge ETH.

This is how our app works.



### Variables Explanation



``` solidity
uint256 public slope;
    uint256 public baseFee;
    uint256 public tokenNumber;
    address public owner;
```
These variables are self-explanatory after the explanation of the Bonding Curve Algorithm. <br/>


```solidity

 constructor(uint256 _slope, uint256 _baseFee)
        ERC20Burnable()
        ERC20("SlopeLeverage", "SLPLEV")

```

Here we are initializing our smart contract to become an ERC20 contract with additional functionality of burning tokens. <br/>



```solidity

 function getTokenPrice() public view returns (uint256) {
        uint256 tokenPrice = (slope * tokenNumber * 10**18) + baseFee;
        return tokenPrice;
    }


```
This function returns the calculated latest price of the token using the linear Bonding curve algorithm.


```solidity

 function buyToken() public payable {
        require(
            msg.value >= getTokenPrice(),
            "Insufficient Funds for purchasing token"
        );
        _mint(msg.sender, 1);
        tokenNumber++;
    }

```
To buy a token, the user has to pay some money <br/>
that is equal to the latest price of the token calculated by  `getTokenPrice` method. 

If sufficient funds are sent to the contract , the token is minted to the user.

TokenNumber variable is incremented each time someone buys a token <br/>
for keeping track of how many tokens are created.



```solidity


    function sellToken() public payable {
        require(balanceOf(msg.sender) > 0, "You do not have tokens to sell");
        tokenNumber--;
        uint256 tokenPrice = getTokenPrice();
        _spendAllowance(msg.sender, address(this), 1);
        _burn(msg.sender, 1);
        (bool sent, bytes memory data) = payable(msg.sender).call{
            value: tokenPrice
        }("");
        require(sent, "Failed to send Funds");
    }

```
This method checks if the user have at least one token to sell. <br/>
Decrement the number of tokens because this token will be burnt.


For selling token , the contract has to be approved by the owner of the token ( we will see this in frontend integration) <br/>
So, when the contract burns the token , it's allowance should be reduced .<br/>
That's what the `_spendAllowance` function does.


Then we do burn the token and send the payment to the user / owner of the token.


#### Deployment

Now hit `CTRL+S` in Remix , and click on compile `SlopeLeverage.sol` in the left bar of the Remix IDE. <br/> 

![image](https://user-images.githubusercontent.com/71306738/208867643-daf9539d-9770-43af-855e-6ec6d8e9cb37.png)

In the image , from the position `1`, select `injected provider` which is metamask for us. <br/>

Click on position `3` which is an Ethereum Icon for denoting deployment , this will open up a space like this :

![image](https://user-images.githubusercontent.com/71306738/208868402-509b2a3b-aa89-405b-97b5-f7d631ee51d8.png)

Now Next to deploy button , we have to pass two parameters to the contract , slope and base fee , remember from constructor

![image](https://user-images.githubusercontent.com/71306738/208868644-c8b1955a-62e1-44a7-8bdf-e9c802d35087.png)

Like this 
![image](https://user-images.githubusercontent.com/71306738/208868975-e19e6a84-6c9b-406e-86b4-112e320683b6.png)


Here we are passing Slope to be `1` and Base Fee to be `100000000000000000` which is `0.1 ETH` or `0.1 MATIC` because 1 MATIC = 10^18

Click on deploy , sign the transaction in your metamask pop up and you will have a screen like this .

![image](https://user-images.githubusercontent.com/71306738/208869670-b0f85b8d-1946-42d1-9fdc-a150e777f453.png)

Copy the deployment address somewhere , it will be used in future <br/>



#### End of smart contract section

This is a wrap for our smart contract.

#### Appreciation
Before moving further , give a tap on your back that you have made this far. <br/>
Only 10% of the people will reach this stage.<br/>
So you are a gem 💖

No, time to move forward.


### FrontEnd Design

Time to open your project folder containing the next js app we made in the first place. <br/>

in the `pages` directory , open _app.js file and paste the following in it.

`javascript

import { ChakraProvider } from "@chakra-ui/react";
export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

`

having a look at the code you just pasted, you will know that we are using something called Chakra UI.

So what chakra UI is ?

Read in their own words :

`"Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications."`

You can visit [Detailed Documentation of Chakra UI](https://chakra-ui.com/getting-started)

Read a bit about how chakra ui works and then come back to the tutorial.


#### Chakra UI Installation
In your terminal , paste this and hit enter:

`npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion`

Create a new folder in the root of your Next JS app named `components`

Now, open your `components` directory and Make the Following Empty Files

`Navbar.js`

`NavbarItem.js`

`Portal.js`

`SmartContract.js `


And here we start pasting stuff ( due to time constraints issues ) <br/>

Open `Navbar.js` and paste the following code in it.


```javascript

import { Center, Img, Box, HStack } from "@chakra-ui/react";
import React from "react";
import NavbarItem from "./NavbarItem";
function Navbar() {
  return (
    <Center>
      <HStack
        as="div"
        borderRadius={"20px"}
        bg={"black"}
        color={"white"}
        marginTop={"10vh"}
        width={"300px"}
        height={"60px"}
        padding={"10px"}
      >
        <Img
          borderRadius={"50%"}
          width={"40px"}
          src="https://thumbs.dreamstime.com/b/chain-icon-vector-sign-symbol-isolated-white-background-chain-logo-concept-chain-icon-vector-isolated-white-background-133731775.jpg"
        />
        <HStack
          justify={"space-between"}
          bg={"black"}
          padding={"10px"}
          borderRadius={"20px"}
          width={"100%"}
        >
          <NavbarItem link={"#"} title={"Buy"} />
          <NavbarItem link={"#"} title={"Sell"} />
          <NavbarItem link={"#"} title={"About Us"} />
        </HStack>
      </HStack>
    </Center>
  );
}

export default Navbar;

```

it is just a simple Navbar component with a company logo and 3 dummy links, nothing special.

Note that it is using `NavbarItem` component so paste the following data in that file 

```javascript

import { Box, Link } from "@chakra-ui/react";
import React from "react";

function NavbarItem({ link, title }) {
  return (
    <Box color={"white"}>
      <Link href={link}>{title}</Link>
    </Box>
  );
}

export default NavbarItem;

```


Open `Portal.js` and write the following code in it

```javascript

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

```
This is where the magic happens. I will try to briefly elaborate on each piece of code. <br/>
If things are unclear still, shoot me in the DMs.



```javascript

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

```

importing multiple things, nothing really special.



```javascript

import { ethers } from "ethers";
import { contractAddress, abi } from "../components/SmartContract";
import { parseEther } from "ethers/lib/utils";
```
Note here we are importing ethers js library for interacting with our smart contract but we have not installed it. <br/>

Let's install by typing the following in the terminal and hitting enter

```javascript 
npm i ethers
```

On second line , we are importing the deployed smart contract address from `SmartContract.js` file .

Before moving forward, open `SmartContract.js` file and paste the following data :


```
javascript

export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_slope",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_baseFee",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "buyToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sellToken",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "slope",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const contractAddress = "YOUR Deployed smart contract address";


```

see in the last line , we are inserting the deployed smart contract address.<br/> 
( paste the one you have copied while deployment of smart contract)

The variable will look something like this :


```javascript
export const contractAddress = "0xEe165A4a792d2b9CC9b0C104a7621f490d2D1EbD";
```

but with your address in it.



Now Let's keep moving , we are almost there.




```javascript
async function getFeesForMumbai() {
  ...
}
```

This function gives us the estimated transaction gas fees for sending a certain transaction on the Mumbai Testnet of Polygon Chain. <br/>


```javascript
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
```

this function connects the wallet, wraps in an ethers provider and provider signer of the connected account. <br/>



```javascript

async function getContract(setter) {
  ...
}
```

gives a contract instance to interact with by accepting the ABI and Deployment address of the smart contract. <br/>




```javascript

  const [currentTokenPrice, setCurrentTokenPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [connectedAddress, setConnectAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const contractAllowance = useRef(0);
  const [alertUser, setAlertUser] = useState(null);
```
We are just initializing some state variables here.

And a reference variable to check if our platform currently has an allowance to spend user's tokens. <br/>

`alertUser` is a special state variable that changes over time <br/>
and used to show pop-up messages on the user's screen upon different states of Blockchain Transactions.


```javascript
async function getTokenPrice() {
   ...
  }
```
Gets the latest price of the token from the contract.


```javascript
  async function updateBalance() {
   ...
  }
```

Checks for how many tokens the connected wallet currently owns. <br/>



```javascript

  async function getContractAllowance() {
  ...
  }
```

Get the number of tokens the smart contract / our platform is allowed to spend from the connected user's wallet. <br/>




```javascript
 async function ApprovePlatform() {
  ...
  }
```

For selling the token, the user has to allow the platform to trade his/her tokens. <br/>
This function does that.


```javascript

  async function handleBuy() {
   ... 
  }
```
Buys the token.

```javascript
async function handleSell() {
...
}
```
Sells the token :/

```javascript

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

```
UseEffect gets called when the component renders for the first time. <br/>
But it is also called when one of the variables in the dependency array changes.

In our case, whenever Wallet is connected , the function gets called.

If the wallet is not connected , it gets it to connect.

If it is connected , it does following


1. Gets the contract instance to interact with 
2. Update the number of tokens the user owns
3. Get the latest price of the token 
4. Get the number of tokens the platform is allowed to trade.


After that, there is just a simple UI tactics :/.


### Running the App
If until now, you have followed things step by step , you can type `npm run dev` in the terminal and hit enter.

Visit localhost:3000 and you should be able to see

`a working DeFi dapp that is a mini trading platform using Bonding Curve Algorithm`.

If everything is working , Congratulations 🎉🎊🥳

You made it.

Share it on LinkedIn or Twitter and tag me too as @umarkhatab465. <br/>

![mionion2](https://user-images.githubusercontent.com/71306738/208883824-2faeef26-ed56-4176-a921-869b1c8e6aad.gif)

##
##
If things are not going good , ask me on social media directly either on LinkedIn or Twitter.

DMs are all yours.



## Final Note

Thank you so much for reading my tutorial.

It took a lot of effort to make this but if it has added even a little bit of value to your life, I'm happy!

Thank you :)
##
![minion1](https://user-images.githubusercontent.com/71306738/208883855-ec79fadf-36dd-49ab-beda-258053a1b714.gif)

##

## My Dapp Deployment Address

https://slope-leverage.vercel.app/
