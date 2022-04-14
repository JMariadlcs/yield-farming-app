// USED FOR CONTRACT DEPLOYMENT ON TESTNET (rinkeby provided by Alchemy)
// run -> npx hardhat run scripts/deployFarm.js --network rinkeby

const main = async () => {
  
    // Smart contract deployment
    // The contract deployed is the one corresponding to TokenFarm.sol

    // For deploying TokenFarm.sol we need the addresses of DaiToken.sol and DappToken.sol
    // (deployed before by running deployTokens.js)
    const DaiTokenAddress = "0xDCA0586847562bF07d521992C51832E805998Bb7";
    const DappTokenAddress = "0x96F59A9AF8FF2025ab79AA1F2156F17a53dcCdd2";

    // Deployment of TokenFarm.sol Smart Contract
    const TokenFarmContractFactory = await hre.ethers.getContractFactory('TokenFarm');
    const TokenFarmContract = await TokenFarmContractFactory.deploy(DappTokenAddress,DaiTokenAddress);
    await TokenFarmContract.deployed();
    console.log("Deployed TokenFarm contract address: ", TokenFarmContract.address);
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