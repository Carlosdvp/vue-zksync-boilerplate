# Vue Frontend

## Building this project step-by-step

1. Created new Vite project with npm init vite@latest web3-template-vue 

2. Installed all dependenciess npm install

### TODO

3. Installed TailwindCSS following the official guide
4. Installed Pinia npm i pinia and created a basic wallet store in src/store/wallet.ts
5. Installed vue-router (v4) and created a couple of views
6. Created a NavBar component with the buttons to connect Metamask wallet, save wallet info in store and navigate between routes
7. Installed node types to use process.env with npm install @types/node --save-dev
8. Fixed @ imports in vite.config.js

--------------------------------------------------------------------------------------------------


## Steps to build up the Front End

1. Install zksync-web3
2. Getting the ABI and contract address
3. Working with provider

  1. Go to the initializeProviderAndSigner method in ./src/App.vue. This method is called after the connection to Metamask is successful.

  In this method we should:

  - Initialize a Web3Provider and a Signer to interact with zkSync.
  - Initialize the Contract object to interact with the Greeter contract we just deployed.
  
  2. Import the necessary dependencies:

  - import { Contract, Web3Provider, Provider } from "zksync-web3";
  
  3. Initialise the provider, signer, and contract instances.

4. Retrieving the greeting

Ran into an issue possible related to how I mixed typescript with the Options api for Vue; I think I may have broken something by trying to mix them incorrectly.

I need to take a step back and redo this part:
  - create another folder for the basic Vue dApp frontend
  - start from scratch and redo the frontend
  - get it to work
  - compare with the TS Vue composition approach, understand the differences and how each approach solves the task: "Connecting to Metamask"
  - Then it would be a good idea to document this somewhere in a clear and straightforward manner, maybe in Notion.