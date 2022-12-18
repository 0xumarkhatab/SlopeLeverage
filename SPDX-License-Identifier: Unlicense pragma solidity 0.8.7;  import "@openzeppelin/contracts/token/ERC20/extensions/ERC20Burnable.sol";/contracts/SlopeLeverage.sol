//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// 1,1000000000000000000

contract SlopeLeverage is ERC20Burnable{

    uint public slope;
    uint public baseFee;
    uint public tokenNumber;
    address public owner;

    constructor(uint _slope,uint _baseFee) ERC20("SlopeLeverage","SLPLEV"){
        owner=msg.sender;
        tokenNumber=0;
        slope=_slope;
        baseFee=_baseFee;

    }

    function getTokenPrice()public view returns(uint){
        uint tokenPrice=(slope*tokenNumber*10**18)+baseFee;
        return tokenPrice;
    }

    function BuyToken()public payable{
        require(msg.value>=getTokenPrice(),"Insufficient Funds for purchasing token");
        _mint(msg.sender, 1*10**18);
        tokenNumber++;

    }
    function SellToken()public payable{
        require(balanceOf(msg.sender)>0,"You do not have tokens to sell");
        burnFrom(msg.sender, 1*10**18);
        tokenNumber--;
        
    }



}
