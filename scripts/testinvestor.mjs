// USED FOR SETTING UP OUR ENVIROMENT
// run -> node --experimental-json-modules scripts/testinvestor.mjs

// THIS SCRIPT IS USED FOR TESTING INVESTOR STAKE, UNSTAKE AND OWNER ISSUE REWARD FUNCTIONS

import abi from './utils/TokenFarm.json'; // Update it everytime you deploy a new contract
import abi2 from './utils/DaiToken.json';
import { ethers } from "ethers";
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {

     // CONTRACT IMPORT AND INSTANTIATION
    // Deployed contract address and ABI imports
    const TokenFarmContractaddress = "0xe359B873Eb0034aa5721206911E67deD1CCE36D1";
    const TokenFarmContractABI = abi.abi;
    const DaiTokenContractaddress = "0xDCA0586847562bF07d521992C51832E805998Bb7";
    const DaiTokenContractABI = abi2.abi;
    
    // Network provider (Alchemy)
    const provider = new ethers.providers.AlchemyProvider('rinkeby', process.env.STAGING_ALCHEMY_KEY_MJS);

    // Instantiation of wallet object using provider and PRIVATE_KEY (OWNER) - for issuing rewards
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const signer = wallet.connect(provider);

    // Instantiation of wallet object using provider and PRIVATE_KEY (INVESTOR) - for stake and unstake tokens
    const wallet2 = new ethers.Wallet(process.env.PRIVATE_KEY_TWO, provider);
    const signer2 = wallet2.connect(provider);
    
    // Instantiate TokenFarm.sol contract for OWNER
    const TokenFarmcontractOwner = new ethers.Contract(TokenFarmContractaddress , TokenFarmContractABI, signer);
    console.log("Contract imported address (Token Farm) for Owner:", TokenFarmContractaddress);

    // Instantiate TokenFarm.sol and DaiToken.sol contract for INVESTOR
    const TokenFarmcontractInvestor = new ethers.Contract(TokenFarmContractaddress , TokenFarmContractABI, signer2);
    const DaiTokencontractInvestor = new ethers.Contract(DaiTokenContractaddress , DaiTokenContractABI, signer2);
    console.log("Contract imported address (Token Farm) for Investor:", TokenFarmContractaddress);

    // Test staking function
    console.log("Staking tokens...");
    //try{
        console.log("Approving...")
        await DaiTokencontractInvestor.approve(process.env.INVESTOR_ADDRESS, 5);
        console.log("Approved")
        const txn = await TokenFarmcontractInvestor.stakeTokens(5);
        console.log("Staked!");
    //}catch(error){
        console.log("ERROR: staking amount can not be 0.");
    //}

    // Test issuing rewards
    console.log("Issuing rewards...");
    try{
        await TokenFarmcontractOwner.issueTokens();
        console.log("Issued!!");
        }catch(error){
            console.log("ERROR: only OWNER can issue tokens.");
        }

    // Test unstaking function
    console.log("Unstaking tokens...");
    try{
        await TokenFarmcontractInvestor.unstakeTokens(10);
        console.log("Staked!");
    }catch(error){
        console.log("ERROR: There are not staked tokens.");
    }
};
  
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();