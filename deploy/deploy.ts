import * as ethers from "ethers";
import { Wallet, utils } from "zksync-web3";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

import dotenv from "dotenv";
dotenv.config();

const walletPrivateKey = process.env.PRIVATE_KEY || "";

// sample deploy script
export default async function (hre: HardhatRuntimeEnvironment ) {
  console.log('Running deploy script for the greeter contract');

  const wallet = new Wallet(walletPrivateKey);
  const deployeer = new Deployer(hre, wallet);
  const artifact = await deployeer.loadArtifact("Greeter");

  // estimate deployment fees
  const greeting = "How you doin";
  const deploymentFee = await deployeer.estimateDeployFee(artifact, [greeting]);

  // Deploy the contract
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const greeterContract = await deployeer.deploy(artifact, [greeting]);

  // constructor args
  console.log("constructor args: " + greeterContract.interface.encodeDeploy([greeting]));

  // show contract info
  const contractAddress = greeterContract.address;
  console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
}
