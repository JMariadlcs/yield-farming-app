// USED FOR CONTRACT DEPLOYMENT ON TESTNET (rinkeby provided by Alchemy)
// run -> npx hardhat run scripts/deployTokens.js --network rinkeby

const main = async () => {
  
    // Smart contract deployment
    // The contract deployed here are the ones corresponding to DaiToken.sol and DappToken.sol
    const DaiTokenContractFactory = await hre.ethers.getContractFactory('DaiToken');
    const DaiTokenContract = await DaiTokenContractFactory.deploy();
    await DaiTokenContract.deployed();
    console.log("Deployed Dai Token contract address: ", DaiTokenContract.address);

    const DappTokenContractFactory = await hre.ethers.getContractFactory('DappToken');
    const DappTokenContract = await DappTokenContractFactory.deploy();
    await DappTokenContract.deployed();
    console.log("Deployed Dapp Token contract address: ", DappTokenContract.address);

    // Once both contracts are deployed the DEPLOYING ADDRESS will have every DAPP SUPPLY and EVERY mDAI SUPPLY
    console.log("Once both contracts are deployed the DEPLOYING ADDRESS will have every DAPP SUPPLY and EVERY mDAI SUPPLY");
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