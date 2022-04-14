pragma solidity ^0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{ // Goal: receive DAITokens and issue DappTokens

    // variables
    string public name = "Dapp Token Farm";
    address public owner;

    // declare the token Smart Contracts used here
    DappToken public dappToken;
    DaiToken public daiToken;

    constructor(DappToken _dappToken, DaiToken _daiToken) public { // instanciate the token Smart Contracts used here
        owner = msg.sender;
        dappToken = _dappToken;
        daiToken = _daiToken;

    }


}