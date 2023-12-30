<!-- eslint-disable prettier/prettier -->
<template>
  <div class="w-full py-5 px-0">
    <div v-if="loading" class="bg-white flex justify-center items-center py-28">
      <AppSpinner />
    </div>
    <div v-else>
      <div class="grid">
        <div class="bg-yellow-500 h-40 rounded--b-lg w-full"></div>
        <div
          class="z-1 bg-[#fff] mx-auto transform md:-translate-y-20 -translate-y-20 py-8 px-4 rounded-lg w-11/12"
        >
          <div
            class="flex justify-between items-center border-b md:p-4 px-0 py-2"
          >
            <div class="">
              <div class="text-xl font-medium">ZUSD Balance</div>
              <div class="md:text-3xl text-xl font-black">
                {{ zusdBalance }}
              </div>
            </div>
            <button
              @click="retrieveDepositAddress"
              class="p-5 rounded-xl flex justify-center outline-none bg-slate-600"
            >
              <div :class="Retrieveloading ? 'animate animate-spin' : null">
                <i class="text-xl fa-solid text-white fa-rotate"></i>
              </div>
            </button>
          </div>
          <div class="flex justify-around py-3 text-center">
            <router-link
              to="/deposit"
              class="flex-col space-y-4 justify-center items-center"
            >
              <div
                class="p-5 grid w-16 place-content-center rounded-xl bg-green-600"
              >
                <i
                  class="fa-solid fa-arrow-up md:text-base text-xs text-white"
                ></i>
              </div>

              <div class="md:text-base text-xs font-medium">Deposit</div>
            </router-link>
            <router-link
              to="/withdraw"
              class="flex-col space-y-4 justify-center items-center"
            >
              <div
                class="p-5 grid w-16 place-content-center rounded-xl bg-pink-600"
              >
                <i
                  class="fa-solid fa-arrow-down md:text-base text-xs text-white"
                ></i>
              </div>
              <div class="md:text-base text-xs font-medium">Withdraw</div>
            </router-link>

            <router-link
              to="/swap"
              class="flex-col space-y-4 justify-center items-center"
            >
              <div
                class="p-5 grid w-16 place-content-center rounded-xl bg-yellow-600"
              >
                <i
                  class="fa-solid fa-exchange md:text-base text-xs text-white"
                ></i>
              </div>
              <div class="md:text-base text-xs font-medium">Swap</div>
            </router-link>
            <router-link
              to="#"
              class="flex-col space-y-4 justify-center items-center"
            >
              <div
                class="p-5 grid w-16 place-content-center rounded-xl bg-blue-600"
              >
                <i
                  class="fa-solid fa-credit-card md:text-base text-xs text-white"
                ></i>
              </div>
              <div class="md:text-base text-xs font-medium">Bill Payment</div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- Stable Coin -->
      <div class="py-8 w-11/12 mx-auto -mt-20">
        <h1 class="font-bold text-xl mb-4">Supported Wallets</h1>
        <div class="shadow rounded-xl p-5 space-y-4 bg-gray-400">
          <div class="md:text-base text-xs font-medium uppercase">
            Samzuga Coin
          </div>
          <div class="font-semibold md:text-lg text-base">
            {{ szcBalance?.wallet_balance_formatted || 0 }} ~ ${{
              usdEquivalent
            }}
          </div>
          <!-- <div class="font-semibold md:text-lg text-base"></div> -->
        </div>
        <div class="grid grid-cols-2 space-x-4 mt-2 py-4 carousel">
          <div class="shadow rounded-xl p-5 space-y-4 bg-[#f7f7f7]">
            <div class="md:text-base text-xs font-medium uppercase">
              Zuga USD
            </div>
            <div class="font-semibold md:text-lg text-base">
              {{ zusdBalance }}
            </div>
          </div>
          <div class="shadow rounded-xl p-5 space-y-4 bg-[#f7f7f7]">
            <div class="md:text-base text-xs font-medium uppercase">
              Zuga NGN
            </div>
            <div class="font-semibold md:text-lg text-base">
              {{ zngnBalance }}
            </div>
          </div>
        </div>
      </div>
      <!-- Supported Wallet -->
      <div class="py-8 w-11/12 mx-auto -mt-10">
        <h1 class="font-bold text-xl">All Wallets</h1>
        <div
          class="flex overflow-auto flex-nowrap space-x-4 mt-2 py-4 carousel"
          v-if="wallet_balance"
        >
          <div
            class="shadow rounded-xl min-w-[300px] p-5 space-y-4"
            v-for="(item, key) in wallet_balance"
            :key="key"
            :class="colors[key]"
          >
            <div class="md:text-base text-xs font-medium uppercase">
              {{ item.wallet_id }}
            </div>
            <div class="font-semibold text-lg">
              {{ item.wallet_balance_formatted }}
            </div>
          </div>
        </div>
      </div>

      <!-- Services Wallet -->

      <div class="w-11/12 mx-auto grid grid-cols-2 gap-4">
        <router-link
          to="#"
          class="cursor-pointer flex flex-col items-center space-y-1 p-4 rounded-2xl tranform hover:-translate-y-2 duration-300 shadow-sm bg-white"
        >
          <div
            class="grid place-content-center w-10 h-10 text-white bg-black p-4 rounded-full"
          >
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
          </div>
          <h2 class="font-medium text-lg">Airtime</h2>
          <h6 class="text-xs font-medium text-center text-[#00000090]">
            Buy airtime directly with your crypto
          </h6>
        </router-link>
        <router-link
          to="#"
          class="flex flex-col items-center space-y-1 p-4 rounded-2xl tranform hover:-translate-y-2 duration-300 shadow-sm bg-white"
        >
          <div
            class="grid place-content-center w-10 h-10 text-white bg-black p-4 rounded-full"
          >
            <i class="fa-solid fa-download"></i>
          </div>
          <h2 class="font-medium text-lg">Data</h2>
          <h6 class="text-xs font-medium text-[#00000090] text-center">
            Buy data directly with your crypto
          </h6>
        </router-link>
        <div
          class="flex flex-col items-center space-y-1 p-4 rounded-2xl tranform hover:-translate-y-2 duration-300 shadow-sm bg-white bg-opacity-60"
        >
          <div
            class="grid place-content-center w-10 h-10 text-white bg-black p-4 rounded-full"
          >
            <i class="fa-solid fa-bolt"></i>
          </div>
          <h2 class="font-medium text-lg">Electricity</h2>
          <h6 class="text-xs font-medium text-center">
            Electricity recharge with your crypto
            <small class="text-gray-500">(Coming soon)</small>
          </h6>
        </div>
        <div
          class="flex flex-col items-center space-y-1 p-4 rounded-2xl tranform hover:-translate-y-2 duration-300 shadow-sm bg-white"
        >
          <div
            class="grid place-content-center w-10 h-10 text-white bg-black p-4 rounded-full"
          >
            <i class="fa-solid fa-satellite-dish"></i>
          </div>
          <h2 class="font-medium text-lg">Cable TV</h2>
          <h6 class="text-xs font-medium text-center">
            Satelite subscription with your crypto
            <small class="text-gray-500">(Coming soon)</small>
          </h6>
        </div>
      </div>
      <div class="py-8 w-11/12 mx-auto">
        <h1 class="font-bold text-xl">Transactions</h1>
        <div class="grid md:grid-cols-4 gap-4 mt-2">
          <div
            class="shadow rounded-xl p-5 bg-white space-y-4"
            v-for="(item, key) in TransactionDetails"
            :key="key"
          >
            <div class="md:text-base text-xs font-medium">
              ID: {{ item.transaction_id }}
            </div>
            <div class="md:text-base text-xs font-medium">
              {{ item.note || "" }}
            </div>
            <div class="font-semibold text-lg">
              <div
                :class="
                  item.txn_type == 'CREDIT' ? 'text-green-600' : 'text-red-600'
                "
              >
                <span v-if="item.txn_type == 'CREDIT'">+</span
                ><span v-else>-</span> {{ item.amount_formatted_disp }}
              </div>
            </div>
            <div class="text-sm">
              {{ getDate("lll", item.post_date) }}
            </div>
          </div>
        </div>
      </div>

      <div class="text-center font-medium md:mb-0 mb-6">
        <h1>Copyright ZUGAVALIZE &copy; 2022. All rights reserved.</h1>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable  */
import moment from "moment";

import { mapGetters } from "vuex";
import axios from "@/Utils/axios.config.js";
import AppSpinner from "./AppSpinner.vue";

export default {
  name: "Dashboard",
  data() {
    return {
      wallet_balance: [],
      loading: false,
      Retrieveloading: false,
      TransactionDetails: [],
      usdEquivalent: 0,
      address: "",
      colors: [
        "bg-blue-200 ",
        "bg-green-300 ",
        "bg-yellow-400 ",
        "bg-gray-400 ",
        "bg-yellow-600 ",
        "bg-violet-100 ",
        "bg-red-100 ",
        "bg-pink-100 ",
        "bg-blue-400 ",
        "bg-blue-200",
        "bg-teal-200",
        "bg-green-400",
        "bg-purple-400",
      ],
    };
  },
  mounted() {
    this.getBalance();
    this.getTransactionHistory();
    // this.getDepositAddress();
  },
  watch: {
    szcBalance() {
      this.getUsdEquivalent();
    },
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    szcBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "szc"
        );
        return balance;
      } else {
        return 0;
      }
    },
    zusdBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "zusd"
        );
        return balance?.wallet_balance_formatted || 0;
      } else {
        return 0;
      }
    },
    zngnBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "zngn"
        );
        return balance?.wallet_balance_formatted || 0;
      } else {
        return 0;
      }
    },
  },
  methods: {
    getDate(Format, date) {
      return moment(date).format(Format);
    },
    getUsdEquivalent() {
      axios
        .post("https://middleware.zugavalize.io/converter", {
          amount: this.szcBalance?.wallet_balance_raw,
          wallet_from: "szc",
          wallet_to: "usd",
        })
        .then((response) => {
          this.usdEquivalent = response.data.data.conversion;
        });
    },
    async getDepositAddress() {
      await axios
        .get(
          `https://backend.zugavalize.io/wp-json/coinrimp/v1/allocate-crypto-wallet-address?user_id=${this.currentUserData.id}&coin_abbr=eth&security_secret=CODE`
        )
        .then((response) => {
          this.address = response.data.data.eth;
          this.retrieveDepositAddress();
        });
    },
    retrieveDepositAddress() {
      this.Retrieveloading = true;
      axios
        .get(
          `https://puller.zugavalize.io/api/retrieve-blockchain-deposit?address=${this.currentUserData.eth_crypto_wallet_deposit_address}`
        )
        .then((response) => {
          this.Retrieveloading = false;
          this.getBalance();
          console.log(response);
        });
    },
    getBalance() {
      axios
        .get(
          `/user-wallet-balance/multi?wallet_id=btc,szcb,usdt,bnb,zusd,zngn,szc,eth,ngn,susd,usd,gzcii,susd_cashback&formatted=yes&user_id=${this.currentUserData.id}`
        )
        .then((res) => {
          this.loading = false;
          this.wallet_balance = Object.values(res.data.data);
        });
    },
    async getTransactionHistory() {
      this.loading = true;
      await axios
        .get(
          `https://backend.zugavalize.io/wp-json/rimplenet/v1/transactions?user_id=${this.currentUserData.id}`
        )
        .then((response) => {
          this.loading = false;
          this.TransactionDetails = response.data;
          // this.TransactionDetails.forEach((item) => {
          //   const date = item.post_date.split(" ")[0];
          //   if (this.transactionMobileData[date]) {
          //     this.transactionMobileData[date].push(item);
          //   } else {
          //     this.transactionMobileData[date] = [item];
          //   }
          // });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
      console.log(this.TransactionDetails);
    },
  },
  components: { AppSpinner },
};
</script>

<style class>
.header-bg {
  background-image: url("../assets/yellow-bg.jpg");
  /* height: 10px; */
}
.carousel::-webkit-scrollbar {
  height: 4px;
}
.carousel::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background-color: #777;
}
</style>
