pragma solidity ^0.8.4;

import "./DappToken.sol";
import "./DaiToken.sol";
import "hardhat/console.sol";

contract TokenFarm{ // Goal: receive DAITokens and issue DappTokens
    
    // variables
    string public name = "Dapp Token Farm";
    address public owner;

    // declare the token Smart Contracts used here
    DappToken public dappToken;
    DaiToken public daiToken;

    // mapping for storing the stakingBalance of each investor
    mapping(address => uint) public stakingBalance;
    // mapping for storing that the user has already staked
    mapping(address => bool) public hasStaked;
    // mapping for storing that is at the time staking
    mapping(address => bool) public isStaking;
    // array for store EVERY address that has staked
    address[] public stakers;

    constructor(DappToken _dappToken, DaiToken _daiToken) public { // instanciate the token Smart Contracts used here
        dappToken = _dappToken;
        daiToken = _daiToken;
        owner = msg.sender;
       
    }

    receive() external payable {

    }

    // 1. Tokens staking (deposit money)
    // Transfer mDAI tokens for staking (from investor's wallet to TokenFarm.sol Smart Contract)
    function stakeTokens(uint _amount) public payable {
        require(_amount > 0, "wrong amount: 0, increment amount"); // check that amount is valid

        daiToken.transferFrom(msg.sender, address(this), _amount); // transferFrom is an ERC20 function
        stakingBalance[msg.sender] =  stakingBalance[msg.sender] + _amount; // update stakingBalance of the investor

        // Push users address to staking array JUST if its FIRST TIME (otherwise they would be already on the array) (AVOID DOUBLE COUNTING)
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        hasStaked[msg.sender] = true; // update hasStaked mapping
        isStaking[msg.sender] = true; // update isStaking mapping
    }

    // 2. Tokens unstaking (withdraw money)
    function unstakeTokens() public{
        uint balance = stakingBalance[msg.sender]; // check how many tokens the user has staking

        require(balance > 0, "There is no staked tokens");

        daiToken.transfer(msg.sender, balance); // transfer tokens to user
        stakingBalance[msg.sender] = 0; // update user mapping data
        isStaking[msg.sender] = false; 
    }

    // 3. Tokens issuing (earning interest)
    function issueTokens() public {
        require (msg.sender == owner, "only onwer can issueTokens"); // require that only owner can issueTokens when he decides (e.g. every x blocks)

        for(uint i=0; i< stakers.length; i++){ //loop for issue rewards to EVERY user in the array
            address receiver = stakers[i];
            uint balance = stakingBalance[receiver]; // check balance to calculate how much is the reward (owning 1 mDAI staked = earning 1 DAPP Token)
            if(balance > 0){ //check user has not withdraw before and now has 0 tokens staking    
                dappToken.transfer(receiver, balance); // staking is 1:1
            }
        }
    }
}