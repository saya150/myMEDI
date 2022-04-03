require("@nomiclabs/hardhat-waffle");
//Enter Own private key
const PRIVATE_KEY='';
// const fs = require('fs');
// const privateKey = fs.readFileSync(".secret").toString().trim();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [`0x3fe4c77856d008d508ea222ebf4c1fc8692abd519cb7850f9912c955a42e7f74`]
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4"
      },
      {
        version: "0.8.0"
      },
      {
        version: "0.6.12"
      },
      {
        version: "0.4.0"
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};

