<!-- eslint-disable -->
<template>
  <div>
    <div class="w-full py-16 px-4">
      <div class="bg-white rounded-lg p-4 mt-5">
        <div class="font-bold space-x-2 justify-center flex mb-4">
          <div>Stable Coins <span class="text-blue-900">(New) </span></div>
        </div>

        <div class="max-w-2xl mx-auto">
          <div class="bg-[#f7f7f7] p-2 grid grid-cols-2 mb-4">
            <div
              @click="handletab(1)"
              class="px-10 py-2 font-medium rounded-lg text-xs md:text-base"
              :class="tab1 ? 'bg-yellow-600 text-white' : ' text-black'"
            >
              About Our Stable Coin
            </div>
            <div
              @click="handletab(2)"
              class="px-10 py-2 font-medium rounded-lg text-xs md:text-base"
              :class="tab2 ? 'bg-yellow-600 text-white' : ' text-black'"
            >
              Provide Liquidity
            </div>
          </div>

          <!-- About stable Coin -->
          <div class="airtime" v-if="tab1">
            <p>
              Hurray, we have successfully launched our stable coins. Our stable
              coins will form the basis of transactions on our ecosystem & will
              stand against market fluctuations. Our stable coins have the
              ticker below:
            </p>

            <div class="my-4 flex justify-center items-center space-x-4">
              <button
                class="rounded outline-none hover:bg-yellow-600 hover:text-black duration-300 p-4 bg-[#333] text-center text-white font-medium"
              >
                ZUSD
              </button>
              <button
                class="rounded outline-none hover:bg-yellow-600 hover:text-black duration-300 p-4 bg-[#333] text-center text-white font-medium"
              >
                ZNGN
              </button>
            </div>
            <p>
              Our stable coin is pegged to their respective fiat based
              currencies &amp; is stored in a highly reserved vault using
              cryptographic algorithm.
            </p>
            <div class="flex justify-center items-center space-x-4">
              <button
                @click="handletab(2)"
                class="my-4 rounded outline-none hover:bg-yellow-600 hover:text-black duration-300 p-4 bg-yellow-500 text-center text-white font-medium"
              >
                BE PART OF THE REVOLUTION
              </button>
            </div>
            We solicit you to be part of this crypto-revolution by providing
            liquidity to our stable coin and benefit from the staking reward.
            <button
              @click="handletab(2)"
              class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-4 rounded"
            >
              <div class="font-medium">PROVIDE LIQUIDITY</div>
            </button>
          </div>

          <div class="airtime" v-if="tab2">
            <div class="grid md:grid-cols-2 gap-4 mt-4">
              <div class="w-full">
                <p class="font-medium mb-2">From:</p>
                <div class="grid grid-cols-12 gap-2 bg-[#f7f7f7]">
                  <div class="col-span-4">
                    <select
                      name="From"
                      class="p-4 outline-none border bg-white border-yellow-200 rounded-md w-full"
                      v-model="fromCurrency"
                    >
                      <option disabled>--Select Currency--</option>
                      <option value="usdt">USDT</option>
                      <option value="bnb">BNB</option>
                    </select>
                  </div>
                  <div class="col-span-8">
                    <input
                      type="text"
                      name="amount"
                      placeholder="Amount"
                      @keyup="getEquivalent($event)"
                      v-model="amount"
                      class="p-4 font-semibold bg-transparent w-full outline-none"
                    />
                  </div>
                </div>
              </div>
              <div class="w-full">
                <p class="font-medium mb-2">To:</p>

                <div class="grid grid-cols-12 gap-2 bg-[#f7f7f7]">
                  <div class="col-span-4">
                    <select
                      name="From"
                      class="p-4 outline-none border bg-white border-yellow-200 rounded-md w-full"
                      v-model="toCurrency"
                    >
                      <option disabled>--Select Currency--</option>
                      <option value="zusd">ZUSD</option>
                      <option value="zngn">ZNGN</option>
                    </select>
                  </div>
                  <div class="col-span-8">
                    <div
                      class="flex items-center justify-between pr-2 space-x-2"
                    >
                      <div class="p-4 font-bold">
                        {{ equivalent }}
                      </div>
                      <div
                        v-if="isEquivalentAvail"
                        class="h-6 w-6 rounded-full border-4 border-t-[#F0A500] border-r-[#F0A500] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-gray-500 text-sm mt-2" v-if="fromCurrency == 'usdt'">
              Fee : 1 <span class="uppercase">{{ fromCurrency }}</span>
            </p>
            <p class="text-gray-500 text-sm mt-2" v-else>
              Fee : BNB Equivalent of 1 USDT
            </p>

            <div
              class="shadow rounded-xl p-4 my-4 text-white bg-gray-500"
              v-if="wallet_balance"
            >
              <div class="md:text-base text-xs font-medium uppercase">
                Available balance :

                <strong v-if="fromCurrency == 'usdt'">
                  {{ usdtBalance }}
                </strong>
                <strong v-if="fromCurrency == 'bnb'"> {{ bnbBalance }} </strong>
              </div>
            </div>
            <button
              @click="handleSwap"
              class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-16 rounded"
              :disabled="loading"
            >
              <ActionLoader v-if="loading" />

              <div v-else class="font-medium">PROVIDE LIQUIDITY</div>
            </button>

            <p class="text-center mt-4">
              You can stake ZUSD &amp; earn rewards up to 30% per annum.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import axios from "axios";

import { mapGetters } from "vuex";
import ActionLoader from "../../components/ActionLoader.vue";

export default {
  name: "BillPayment",

  data() {
    return {
      loading: false,
      isEquivalentAvail: false,
      tab1: true,
      tab2: false,
      amount: 0,
      fromCurrency: "usdt",
      toCurrency: "zusd",
      equivalent: 0,
      wallet_balance: null,
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    usdtBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "usdt"
        );
        return balance.wallet_balance_formatted;
      } else {
        return 0;
      }
    },

    bnbBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "bnb"
        );
        return balance.wallet_balance_formatted;
      } else {
        return 0;
      }
    },
  },

  watch: {
    toCurrency() {
      this.getEquivalent();
    },
  },
  mounted() {
    this.getBalance();
  },
  methods: {
    handletab(tab) {
      if (tab == 1) {
        this.tab1 = true;
        this.tab2 = false;
      }
      if (tab == 2) {
        this.tab2 = true;
        this.tab1 = false;
      }
    },
    getBalance() {
      axios
        .get(
          `https://backend.zugavalize.io/wp-json/rimplenet/v1/user-wallet-balance/multi?wallet_id=usdt,bnb&formatted=yes&user_id=${this.currentUserData.id}`
        )
        .then((res) => {
          this.loading = false;
          this.wallet_balance = res.data.data;
        });
    },
    handleSwap() {
      this.loading = true;
      const payload = {
        request_id: `id_${Date.now()}`,
        amount: this.amount,
        user_id: this.currentUserData.id,
        wallet_from: this.fromCurrency,
        wallet_to: this.toCurrency,
        deductions: {
          usdt: {
            tax: 2.4,
            charges: 0.5,
          },
        },
      };

      axios
        .post("https://puller.zugavalize.io/api/swap", payload)
        .then((res) => {
          this.loading = false;
          this.$toast.success(res.data.data.message);

          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error(err.response.data.message);

          console.log(err);
        });
    },
    getEquivalent(e) {
      this.isEquivalentAvail = true;
      axios
        .post("https://middleware.zugavalize.io/converter", {
          amount: this.amount,
          wallet_from: this.fromCurrency,
          wallet_to: this.toCurrency,
        })
        .then((response) => {
          this.isEquivalentAvail = false;
          this.equivalent = response.data.data.conversion;
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.response.data.message);
          this.equivalent = 0;
          this.isEquivalentAvail = false;
        });
    },
  },
  components: {
    ActionLoader,
  },
};
</script>
