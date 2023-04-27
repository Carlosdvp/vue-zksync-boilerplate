<script lang="ts">
// @ts-ignore
const GREETER_CONTRACT_ADDRESS = "0x3b9B4CCf687477F08F16ce1C20792A47846fA54F"; 
const GREETER_CONTRACT_ABI = []; // TODO: Complete and import the ABI
const ETH_L1_ADDRESS = "0x0000000000000000000000000000000000000000";
import allowedTokens from "./eth.json"

export default {
  name: "App",
  data() {
    return {
      newGreeting: "",
      greeting: "unknown",
      tokens: allowedTokens,
      selectedToken: null,
      selectedTokenAddress: "",
      mainLoading: true,
      provider: null,
      signer: null,
      contract: null,
      canSubmit: true,
      // 0 stands for no status, i.e no tx has been sent
      // 1 stands for tx is beeing submitted to the operator
      // 2 stands for tx awaiting commit
      // 3 stands for updating the balance and greeting on the page
      txStatus: 0,
      retrievingFee: false,
      retrievingBalance: false,
      currentBalance: "",
      currentFee: "",
    };
  },
  methods: {
    initializeProviderAndSigner() {
      // TODO: initialize provider and signer based on `window.ethereum`

    },
    async getGreeting() {
      // TODO: return the current greeting
      return "";
    },
    async getFee() {
      // TOOD: return formatted fee
      return "";
    },
    async getBalance() {
      // Return formatted balance
      return "";
    },
    async getOverrides() {
      //@ts-ignore
      if (this.selectedToken.l1Address != ETH_L1_ADDRESS) {
        // TODO: Return data for the paymaster
      }
      return {};
    },
    async changeGreeting() {
      this.txStatus = 1;
      try {
        // TODO: Submit the transaction
        this.txStatus = 2;
        // TODO: Wait for transaction compilation
        this.txStatus = 3;
        // Update greeting
        this.greeting = await this.getGreeting();
        this.retrievingFee = true;
        this.retrievingBalance = true;
        // Update balance and fee
        this.currentBalance = await this.getBalance();
        this.currentFee = await this.getFee();
      } catch (error) {
        console.error(JSON.stringify(error));
      }

      this.txStatus = 0;
      this.retrievingFee = false;
      this.retrievingBalance = false;
    },

    updateFee() {
      this.retrievingFee = true;
      this.getFee()
        .then((fee) => {
          this.currentFee = fee;
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.retrievingFee = false;
        });
    },
    updateBalance() {
      this.retrievingBalance = true;
      this.getBalance()
        .then((balance) => {
          this.currentBalance = balance;
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.retrievingBalance = false;
        });
    },
    changeToken() {
      this.retrievingFee = true;
      this.retrievingBalance = true;
      //@ts-ignore
      const l1Token = this.tokens.filter((token) => token.address === this.selectedTokenAddress)[0];
      //@ts-ignore
      this.provider
        .l2TokenAddress(l1Token.address)
        .then((l2Address) => {
          //@ts-ignore
          this.selectedToken = {
            l1Address: l1Token.address,
            l2Address: l2Address,
            decimals: l1Token.decimals,
            symbol: l1Token.symbol,
          };
          this.updateFee();
          this.updateBalance();
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.retrievingFee = false;
          this.retrievingBalance = false;
        });
    },
    loadMainScreen() {
      this.initializeProviderAndSigner();

      if (!this.provider || !this.signer) {
        console.log("Not connected to Metamask");
        return;
      }

      this.getGreeting().then((greeting) => {
        this.greeting = greeting;
        this.mainLoading = false;
      });
    },
    connectMetamask() {
      //@ts-ignore
      window.ethereum.request({ method: "eth_requestAccounts" })
        .then(() => {
          if (+window.ethereum.networkVersion === 280) {
            this.loadMainScreen();
          } else {
            console.log("Please switch network to zaSync");
          }
        })
        //@ts-ignore
        .catch((error) => console.error(error));
    },
  },
};

</script>

<template>
  <div id="app" v-if="!mainLoading">
    <h1>Greeter says: {{ greeting }} 👋</h1>
    <div>
      This a simple dApp, which can choose fee token and interact with the
      `Greeter` smart contract.
    </div>
    <div class="main-box">
      <div>
        Select token:
        <select v-model="selectedTokenAddress" v-on:change="changeToken">
          <option
            v-for="token in tokens"
            v-bind:value="token.address"
            v-bind:key="token.address"
          >
            {{ token.symbol }}
          </option>
        </select>
      </div>
      <div class="balance" v-if="selectedToken">
        <p>
          Balance: <span v-if="retrievingBalance">Loading...</span>
          <span v-else>{{ currentBalance }} {{ selectedToken.symbol }}</span>
        </p>
        <p>
          Expected fee: <span v-if="retrievingFee">Loading...</span>
          <span v-else>{{ currentFee }} {{ selectedToken.symbol }}</span>
          <button class="refresh-button" v-on:click="updateFee">Refresh</button>
        </p>
      </div>
      <div class="greeting-input">
        <input
          v-model="newGreeting"
          :disabled="!selectedToken || txStatus != 0"
          placeholder="Write new greeting here..."
        />

        <button
          class="change-button"
          :disabled="!selectedToken || txStatus != 0 || retrievingFee"
          v-on:click="changeGreeting"
        >
          <span v-if="selectedToken && !txStatus">Change greeting</span>
          <span v-else-if="!selectedToken">Select token to pay fee first</span>
          <span v-else-if="txStatus == 1">Sending tx...</span>
          <span v-else-if="txStatus == 2"
            >Waiting until tx is committed...</span
          >
          <span v-else-if="txStatus == 3">Updating the page...</span>
          <span v-else-if="retrievingFee">Updating the fee...</span>
        </button>
      </div>
    </div>
  </div>
  <div id="app" v-else>
    <div class="start-screen">
      <h1>Welcome to Greeter dApp!</h1>
      <button v-on:click="connectMetamask">Connect Metamask</button>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #116bc4;
  margin-top: 30px;
}
#app ul {
  display: inline-block;
}
.main-box {
  text-align: left;
  width: 400px;
  margin: auto;
  margin-top: 40px;
  border: 1px solid darkblue;
}
.greeting-input {
  margin-top: 20px;
}
.change-button {
  margin-left: 20px;
}
.start-screen {
  margin-top: 100px;
}
.balance {
  margin-top: 10px;
}
.refresh-button {
  margin-left: 15px;
}
</style>
