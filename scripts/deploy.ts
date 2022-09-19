import { ethers } from "hardhat";

async function main() {

  const factory = ethers.getContractFactory("OnchainDaoge");
  const deployDaoge = (await factory).deploy();
  const contract = await (await deployDaoge).deployed();

  const deploymentGasEstimate = await ethers.provider.estimateGas((await factory).getDeployTransaction());
  console.log("Deploment gas estimate: ", deploymentGasEstimate);

  await contract.deployed();
  console.log(
    `Contract Deployed at address: ${contract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
