import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";


dotenv.config();


const config: HardhatUserConfig = {
  solidity: "0.8.11",
  defaultNetwork: "hardhat",
  networks: { 
    gorilla: {     
      url: process.env.Goerli_API_KEY || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],   
    },
    sepolia: {
      url: process.env.Sepolia_API_KEY || "",
      accounts:
      process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
  
};

export default config;