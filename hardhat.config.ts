import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: `${process.env.MUMBAI_ALCHEMY_URI}`,
      accounts: [`${process.env.MUMBAI_PRIVKEY}`]
    },
    mainnet: {
      url: `${process.env.MAINNET_ALCHEMY_URI}`,
      accounts: [`${process.env.MAINNET_PRIVKEY}`]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: `${process.env.MUMBAI_POLYGONSCAN_API}`,
      mainnet: `${process.env.MAINNET_ETHERSCAN_API}`
    }
  }
}

export default config;
