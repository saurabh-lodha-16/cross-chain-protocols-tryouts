require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    sender: {
      url: process.env.SENDER_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    receiver: {
      url: process.env.RECEIVER_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};
