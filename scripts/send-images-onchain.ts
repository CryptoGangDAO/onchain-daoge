import { sendBytes } from "./send-images";
import { ethers } from "hardhat";
import { OnchainDaoge, OnchainDaoge__factory } from "../typechain-types"

async function sendImages() {
    let signers = await ethers.getSigners();
    let wallet = signers[0];
    const contract = await ethers.getContractAt("OnchainDaoge", `${process.env.MAINNET_CONTRACT_ADDR}`, wallet) as OnchainDaoge;
    sendBytes("./images/", contract);
}

sendImages();