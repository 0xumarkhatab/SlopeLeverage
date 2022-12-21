# Slope Leverage - DeFi Dapp 
![image](https://user-images.githubusercontent.com/71306738/208593841-45f03820-1441-4245-8d72-3002a0ed57a8.png)

## Purpose 
A DeFi platform that uses Linear Bonding curve at it's core to buy and sell tokens.
Essentially a Dcentralized Trading platform ( Mini Version ).

## How It Works ( Big Picture )?
The person who buys tokens first and holds it for some time , can sell it at higher prices.

After each Purchase , the token price `increases` by 1 MATIC.
After each Sell , the token price `drops` by 1 MATIC.
So you have to be a clever player.

## DeFi concepts that you will learn
    
    ✔ Tokenization
    ✔ ERC20
    ✔ Linear Bonding Curve
    ✔ Investment
    ✔ Holding Strategies

## Tech Stack
This is a Fullstack Dapp that utilizes following stack

    ✅ Next JS     - As a frontend development framework
    ✅ Chakra UI   - A Library for premade frontend components and styling
    ✅ Remix IDE   - An Online compiler for compiling and deploying our Smart contract
    ✅ Solidity    - The language for writing our smart contract
    ✅ Polygon     - The fastest and cheapest EVM blockchain to build upon.
    ✅ Metamask    - Our crypto wallet for Purchase and Selling of our tokens.
    

## Tutorial ( How to make one ? )
This tutorial will guide you how to build a Slope Leverage app by yourself.

## Pre-requisite

-   Install VSCode
-   Install and Configure Metamask
-   Install Node JS
-   Basic understanding of how a React or Next JS work

With all set , let's start it up.

### Creating a Next App

First of all We need a `Next Js app` in which we will do everything at our own !
so 

        Create a new folder
        Open that in VScode
        Open your terminal by pressing ``` CTRL + ` ``` on your keyboard
        write "npx create-next-app slope_leverage" in the terminal
        Allow ( tap "y" ) for every step except installing Typescript , we will just be working in javascript.
        Let everything install.
        Test the demo app by writing ` npm run dev ` in the terminal.
        Visit localhost:3000 and you can see the demo app running.
        Congratulations for setting up the app 🎉
        
#### Cleaning the app
In the the `pages` directory , open `index.js` file and remove everything in the body of Home after return statement. <br/>
So your `index.js` will look something like this 


```javascript

export default function Home() {
  return (
    <>
    
    </>
  )
}

```

Now Let's write a heading of our favourite starter `hello world` as 

```javascript
<h1>Hello World</h1> 

```

Navigate to localhost:3000 and see if you can see the Hello world. <br/>
If you can , great , you have completed the second step and we will move forward 

### Smart contract Creation
So , now pause the frontend development here and let's create a smart contract for our platform first.

#### Pre-requisite
        
1. Metamask installed <br/>
2. Polygon mumbai testnet is configured on metamask <br/>
( if you have not configured it yet,  Visit [this Article](https://medium.com/stakingbits/how-to-connect-polygon-mumbai-testnet-to-metamask-fc3487a3871f))
3. Get some test matic from the faucet [here](https://faucet.polygon.technology/) , it will give you half of a matic .
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
![Linear Bonding Curve](https://miro.medium.com/max/1200/0*O0yrtS3ZuLr6HrTY)

This image illustrates the process by which the price of tokens increase as more tokens are created.

So essentially , we are using a simple Slope formula here ( recall calculus for straight lines if you have studied before) <br/>

The formula is here

``` javascript
y=mx+b

```

where `x` is the Number of tokens created , `m` is the slope whose value for the linear curve is `1` and `b` is the base fee for the token.

So the equation becomes something like this

New_Token_Price = Slope * Tokens_Created + Base_Fee;

#### Heading into mathematical calculations
let's say the price of token is 1 Ethereum at first, slope being `1` and initially the tokens created are `0` so

`Base_FEE = 1 ETH`,
`Slope=1`,
`Tokens_Created=0`
Then the price for first token is

price = 1*0+1 ETH = 1 ETH.

Then the price for second token is

price = 1*1+1 ETH = 2 ETH.

Then the price for third token is

price = 1*2+1 ETH = 3 ETH.

Let's say Seemal buys 5 tokens at first paying 1+2+3+4+5=15 ETH to the smart contract

Raida comes in and buys 5 tokens too but the price has reached to 6 ETH now ( remember from the formula). <br/>
She will be paying 6+7+8+9+10 = 40 ETH .

Notice the price variation for both of the buyers, same amount of tokens but who comes first , buys cheap . <br/>


But here comes the interesting part , if Seemal wants to sell her 5 tokens , she will earn more . <br/>

How ?
Total tokens right now are 10 and starting from 0 , the tokens generated are 9 (0 to 9 are 10).

See , first token will be sold at `price = 1*9+1 ETH = 10 ETH`  and this token will be burned means vanish from blockchain like it has not ever created even.<br/>

Second token will be sold at `price = 1*8+1 ETH = 9 ETH`  and this token will be burned too .

Third token ar 8 , fourth at 7 and fifth token at 6 ETH .

So essentially Seemal will sell these tokens for 10+9+8+7+6 = 40 ETH 😲 but she bought it for just 15 ETH <br/>

She will earn the profit of 40-15 = 25 ETH which is huge.

This is how our app works.



### Variables Explanation



``` solidity
uint256 public slope;
    uint256 public baseFee;
    uint256 public tokenNumber;
    address public owner;
```
These variables are self explanatory after the explanation of the Bonding Curve Algorithm. <br/>


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
In order to buy a token, the user has to pay some money <br/>
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


For selling token , the contract has to be approved by the owner of the token ( we will see in frontend integration) <br/>
So, when the contract burns the token , it's allowance should be reduced .<br/>
That's what `_spendAllowance` function does.


Then we do burn the token and send the payment to the user / owner of the token.
        
This is a wrap for our smart contract.

#### Appreciation
Before moving further , give a tap on your back that you have made this far. <br/>
Only 10% of the people will reach to this stage.<br/>
So you are a gem 💖

No , time to move forward.






## Deployment Address

https://slope-leverage.vercel.app/
