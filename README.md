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

### Pre-requisite

-   Install VSCode
-   Install and Configure Metamask
-   Install Node JS
-   Basic understanding of how a React or Next JS work

With all set , let's start it up.

#### Creating a Next App

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



## Deployment Address

https://slope-leverage.vercel.app/
