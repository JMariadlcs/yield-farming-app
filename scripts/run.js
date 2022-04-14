// USED FOR TESTING ON LOCAL NETWORK (local network destroyed once script finish execution)
// run -> npx hardhat run scripts/run.js

const main = async () => {
    const simpleTokenFarmContractFactory = await hre.ethers.getContractFactory('TokenFarm');
    const simpleTokenFarmContract = await simpleTokenFarmContractFactory.deploy();
    await simpleTokenFarmContract.deployed();
    console.log("Deployed contract address:", simpleTokenFarmContract.address);

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