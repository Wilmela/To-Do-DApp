
const hre = require("hardhat");

async function main() {
 const Tasks = await hre.ethers.getContractFactory('Tasks');
 const tasks = await Tasks.deploy();
 await tasks.deployed()

 console.log('Task deployed to: ', tasks.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
