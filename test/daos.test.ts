import { OnchainDaoge } from "../typechain-types"
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { sendBytes } from "../scripts/send-images"

describe("onchain-daoge", function () {
  let contract: OnchainDaoge
  let signers: SignerWithAddress[];
  let deployer: SignerWithAddress;

  it("Deploys contract", async function () {
    signers = await ethers.getSigners();
    deployer = signers[0];
    const factory = ethers.getContractFactory("OnchainDaoge");
    const deployDaoge = (await factory).deploy();
    contract = await (await deployDaoge).deployed();

    expect(await contract.signer.getAddress()).to.equal(deployer.address);
    
  })

  it("Sends the images", async function () {
    await sendBytes('./images/', contract);
  });

  it("Mints a token", async function () {
    const mint = contract.mint();
    await (await mint).wait()
    expect(await contract.balanceOf(deployer.address)).to.equal(1);
  });

  it("Gets Token URI", async function () {
    const tokenURI = await contract.tokenURI(0);
    console.log(tokenURI);
  });

});
