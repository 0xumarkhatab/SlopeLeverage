//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;



import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// 1,1000000000000000000

contract SlopeLeverage is ERC20Burnable{

    uint public slope;
    uint public baseFee;
    uint public tokenNumber;
    address public owner;

    constructor(uint _slope,uint _baseFee) ERC20Burnable() ERC20("SlopeLeverage","SLPLEV"){
        owner=msg.sender;
        tokenNumber=0;
        slope=_slope;
        baseFee=_baseFee;

    }

    function getTokenPrice()public view returns(uint){
        uint tokenPrice=(slope*tokenNumber*10**18)+baseFee;
        return tokenPrice;
    }
//1000000000000000000
//2000000000000000000
    function BuyToken()public payable{
        require(msg.value>=getTokenPrice(),"Insufficient Funds for purchasing token");
        _mint(msg.sender, 10**18);
        tokenNumber++;

    }
    function SellToken()public payable{
        require(balanceOf(msg.sender)>0,"You do not have tokens to sell");
        tokenNumber--;
        uint tokenPrice=getTokenPrice();
        _spendAllowance(msg.sender, address(this), 10**18);
        _burn(msg.sender,  10**18);
        (bool sent, bytes memory data) = payable(msg.sender).call{value: tokenPrice}("");
        require(sent, "Failed to send Funds");
        
        
    }



}
