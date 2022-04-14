// USED FOR SETTING UP OUR ENVIROMENT
// run -> node --experimental-json-modules scripts/setup.mjs

// THIS SCRIPT IS USED FOR SETTING UP THE CONTRACTS AND USERS ENVIROMENTS
// AFTER EXECUTING: 
// 1. DEPLOYING ADDRESS WILL HAVE SENT ENTIRE SUPLY OF DAPPTOKEN TO TokenFarm.sol CONTRACT
// 2. DEPLOYING ADDRESS WILL HAVE SENT 100 mDAI TOKENS TO ADDRESS2 IN ORDER TO BE ABLE TO INTERACT WITH FARM LATER

import abi from './utils/TokenFarm.json'; // Update it everytime you deploy a new contract
import abi2 from './utils/DappToken.json';
import abi3 from './utils/DaiToken.json';
import { ethers } from "ethers";
import dotenv from 'dotenv';
dotenv.config();

const main = async () => {

    // CONTRACT IMPORT AND INSTANTIATION
    // Deployed contract address and ABI imports
    const TokenFarmContractaddress = "0xEd5c30a05A8ADcaA32b31431fBc5F57A74C43183";
    const TokenFarmContractABI = abi.abi;
    const DappTokenContractaddress = "0x96F59A9AF8FF2025ab79AA1F2156F17a53dcCdd2";
    const DappTokenContractABI = abi2.abi;
    const DaiTokenContractaddress = "0xDCA0586847562bF07d521992C51832E805998Bb7";
    const DaiTokenContractABI = abi3.abi;

    // Network provider (Alchemy)
    const provider = new ethers.providers.AlchemyProvider('rinkeby', process.env.STAGING_ALCHEMY_KEY_MJS);

    // Instantiation of wallet object using provider and PRIVATE_KEY
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const signer = wallet.connect(provider);

    // Instantiate TokenFarm.sol contract
    const TokenFarmcontract = new ethers.Contract(TokenFarmContractaddress , TokenFarmContractABI, signer);
    console.log("Contract imported address (Token Farm):", TokenFarmContractaddress);

    // Instantiate DappToken.sol contract (needed to interact with it)
    const DappTokencontract = new ethers.Contract(DappTokenContractaddress , DappTokenContractABI, signer);
    console.log("Contract imported address (DappToken Farm):", DappTokenContractaddress);

    // Instantiate DAIToken.sol contract (needed to interact with it)
    const DaiTokencontract = new ethers.Contract(DaiTokenContractaddress , DaiTokenContractABI, signer);
    console.log("Contract imported address (Token Farm):", DaiTokenContractaddress);


    // Transfer all DappTokens to TokenFarm (1million)
    console.log("Transfering every DappToken funds to TokenFarm....");
    try{ 
        await DappTokencontract.transfer(TokenFarmContractaddress, '1000000000000000000000000'); //1 token = 18 decimals | 1M (total DAPP supply) = 10^6*10^18
        console.log("Transfered!");
    }catch(error){
        console.log("ERROR: User has not enough DAPP Tokens funds");
    } 

    // Trasnfer 100 Mock DAI tokens to investor
    // ADDRESS BELOW IS INVESTOR ADDRESS (Not the one who deploys the contracts)
    console.log("Transfering 100 Mock DAI Tokens to investor with address " + process.env.INVESTOR_ADDRESS);
    try{
        await DaiTokencontract.transfer(process.env.INVESTOR_ADDRESS, '100000000000000000000');
        console.log("Transfered!"); 
    }catch(error){
        console.log("ERROR: User has not enough DAPP Tokens funds");
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