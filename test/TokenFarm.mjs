// USED FOR TESTING TOKENFARM FUNCTIONALITIES
// run -> node --experimental-json-modules test/TokenFarm.mjs

import abi from '../scripts/utils/TokenFarm.json'; // Update it everytime you deploy a new contract
import abi2 from '../scripts/utils/DappToken.json';
import abi3 from '../scripts/utils/DaiToken.json';
import { Contract, ethers } from "ethers";
import dotenv from 'dotenv';
import { assert } from 'chai';
dotenv.config();

const main = async () => {

    // CONTRACT IMPORT AND INSTANTIATION
    // Deployed contract address and ABI imports
    const TokenFarmContractaddress = "0xF50ca2BE8B9E15c11Bd3fa0BC9fe87226eAD7CAe";
    const TokenFarmContractABI = abi.abi;
    const DappTokenContractaddress = "0x5eaF8964484C05E3A11Bed5A480a5e315D2eD6D1";
    const DappTokenContractABI = abi2.abi;
    const DaiTokenContractaddress = "0x405D97E3EE29f9459cbF17e452Cf9Dc93C29A4Db";
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

    require('chai')
    .use(require('chai-as-promised'))
    .should()

    Contract('TokenFarm', (accounts) => {
       
        //test here
        describe('Mock Dai deployment', async() => {
            it('has a name', async () => {
                let daiToken = await DaiTokencontract.new()
                const name = await daiToken.name();
                assert.equal(name, 'Mock Dai Token')
            })
        })
    })


 
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