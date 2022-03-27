const hre = require("hardhat");
const fs = require('fs');

async function main() {
    const viewRecord = await hre.ethers.getContractFactory("ViewRecord");
    const viewRECORD = await viewRecord.deploy();
    await viewRECORD.deployed();
    console.log("viewRecord deployed to:", viewRECORD.address);
    //saveFrontendFiles(viewRECORD , "ViewRecord");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
