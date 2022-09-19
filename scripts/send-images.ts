import { promises as fs } from 'fs'; 
import { OnchainDaoge } from '../typechain-types';
import { ethers } from "hardhat";

export async function sendBytes(directory: string, contract: OnchainDaoge) {
    let files: string[] = [];

  
    files = await fs.readdir(directory);
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        console.log("SENDING FILE:", file);
        const bitmap = await fs.readFile(directory.concat(file));
        const gasEstimate = await contract.estimateGas.storeImage(bitmap);
        const gasCost = await contract.provider.getGasPrice();
        const txCostEstimate = ethers.utils.formatEther(gasEstimate.mul(gasCost).toString());
        console.log(`Estimated gas to deploy ${file}:`, gasEstimate.toNumber());
        console.log(`Estimated cost in Ether: ${txCostEstimate}`)
        const tx =  await contract.storeImage(bitmap, {
          gasLimit: gasEstimate
        });
        await tx.wait();
        console.log("TX HASH:", tx.hash, `\n\n`);
    }
}

