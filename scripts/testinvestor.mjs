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
    const TokenFarmContractaddress = "0x30fd93b3D6Fb4Bf9624F4b9D1818531De63D833d";
    const TokenFarmContractABI = abi.abi;
    const DaiTokenContractaddress = "0xDdc182cca4e36409372417D7dcb253429F774438";
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

    // STAKING - UNSTAKING - ISSUING TOKEN FUNCTION TESTED BELOW
    // COMMUNT - UNCOMMENT DEPENDING ON WHAT FUNCTION YOU WANT TO TEST

    // Test staking function
    console.log("Staking tokens...");
    try{
        console.log("Approving...")
        const txn = await DaiTokencontractInvestor.approve(TokenFarmContractaddress, '5000000000000000000');
        txn.wait();
        //await DaiTokencontractInvestor.approve(TokenFarmContractaddress, 5)
        console.log("Approved")
        const txn2 = await TokenFarmcontractInvestor.stakeTokens('5000000000000000000', {gasLimit: 9999999});
        console.log("Staked!");
    }catch(error){
        console.log("ERROR: staking amount can not be 0.");
    }

    
    // Test issuing rewards
    console.log("Issuing rewards...");
    try{
        const txn = await TokenFarmcontractOwner.issueTokens();
        txn.wait();
        console.log("Issued!!");
        }catch(error){
            console.log("ERROR: only OWNER can issue tokens.");
        }

    // Test unstaking function
    console.log("Unstaking tokens...");
    try{
        const txn = await TokenFarmcontractInvestor.unstakeTokens();
        txn.wait();
        console.log("Unstaked!");
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