# Quickstart Guide Tutorial -- zkSync

Goal: Learn how to deploy a smart contract to zkSync and build a dApp to intercat with it using the zkSync development toolbox.

- A smart contract that stores a greeting message and is deployed on zkSync
- A dApp to retrieve and update the greeting message
- Users will be able to change the greeting on the smart contract
- By default, users will pay fees in ETH

## Prerequisites

- yarn or npm
- A wallet with some Goerli ETH on L1 to pay for bridging funds to L2 and to deploy the smart contract

## Initializing the project & deploying a smart contract

1. Install the required packages
> npm i -D typescript ts-node ethers@^5.7.2 zksync-web3 hardhat @matterlabs/hardhat-zksync-solc @matterlabs/hardhat-zksync-deploy

2. Add the hardhat.config.ts file
3. Create the /contracts and /deploy folders.
4. Create the Greeter.sol contract
5. Compile the contract
  > yarn hardhat compile
6. 

