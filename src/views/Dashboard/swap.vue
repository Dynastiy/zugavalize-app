<!-- eslint-disable -->
<template>
  <div>
    <div class="w-full h-screen overflow-y-auto py-16 px-4">
      <div class="bg-white rounded-lg p-4 mt-5">
        <div class="max-w-2xl mx-auto">
          <div class="font-bold space-x-2 text-center">
            <div>Currency Swap</div>
          </div>

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
                    <option value="zusd">ZUSD</option>
                    <option value="usdt">USDT</option>
                    <option value="bnb">BNB</option>
                    <option value="ngn">NGN</option>
                    <option value="susd">SUSD</option>
                    <option value="gzcii">GZC11</option>
                  </select>
                </div>
                <div class="col-span-8">
                  <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    @keyup="getEquivalent($event)"
                    v-model="amountToSwap"
                    class="p-4 font-semibold bg-transparent w-full outline-none"
                  />
                </div>
              </div>
              <div class="flex justify-between items-center mt-2">
                <p class="text-gray-500 text-sm" v-if="fromCurrency != 'bnb'">
                  <span class="font-bold">Fee</span> : 1
                  <span class="uppercase">{{ fromCurrency }}</span>
                </p>
                <p class="text-gray-500 text-sm" v-else>
                  <span class="font-bold">Fee</span> : BNB Equivalent of 1 ZUSD
                </p>
                <div
                  class="text-right font-bold uppercase text-gray-500 text-xs"
                  v-if="nairaEquivalent"
                >
                  <span>N{{ nairaEquivalent }} </span>
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
                    <option value="szcb">SZCB</option>
                    <option value="usdt">USDT</option>
                    <option value="ngn">NGN</option>
                    <option value="zusd">ZUSD</option>
                    <option value="bnb">BNB</option>
                    <option value="gzcii">GZC11</option>
                  </select>
                </div>
                <div class="col-span-8">
                  <div class="flex items-center justify-between pr-2 space-x-2">
                    <div class="p-4 font-bold">{{ equivalent }}</div>
                    <div
                      v-if="isEquivalentAvail"
                      class="h-6 w-6 rounded-full border-4 border-t-[#F0A500] border-r-[#F0A500] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="shadow rounded-xl p-4 my-4 text-white bg-gray-500"
            v-if="wallet_balance"
          >
            <div class="md:text-base text-xs font-medium uppercase">
              Available balance :
              <strong v-if="fromCurrency == 'zusd'"> {{ zusdBalance }} </strong>
              <strong v-if="fromCurrency == 'usdt'"> {{ usdtBalance }} </strong>
              <strong v-if="fromCurrency == 'bnb'"> {{ bnbBalance }} </strong>
            </div>
          </div>
          <button
            @click="handleSwap"
            class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-16 rounded"
            :disabled="loading"
          >
            <ActionLoader v-if="loading" />

            <div v-else class="font-medium">SWAP</div>
          </button>
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
// import amountConverter from "@/Utils/amountConverter";
// import converter from "@/Utils/converter";

export default {
  name: "Swap",

  data() {
    return {
      isEquivalentAvail: false,
      loading: false,
      wallet_balance: null,
      fromCurrency: "usdt",
      toCurrency: "bnb",
      amountToSwap: 0,
      decodedaddress: "",
      equivalent: 0,
      nairaEquivalent: null,
      conversionObject: null,
      nairaConversionObject: null,
    };
  },
  watch: {
    toCurrency() {
      //0 = this.amountToSwap
      this.getConversion(0, this.fromCurrency, this.toCurrency);
      this.getNairaConversion(0, this.fromCurrency, "ngn");
    },
    fromCurrency() {
      this.getConversion(0, this.fromCurrency, this.toCurrency);
      this.getNairaConversion(0, this.fromCurrency, "ngn");
    },
    amountToSwap() {
      this.getNairaEquivalent();
    },
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    zusdBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "zusd"
        );
        return balance.wallet_balance_formatted;
      } else {
        return 0;
      }
    },
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
  async mounted() {
    //0 = this.amountToSwap to get base calculated figure for later calculation

    this.getBalance();
    this.getConversion(0, this.fromCurrency, this.toCurrency);
    this.getNairaConversion(0, this.fromCurrency, "ngn");
  },

  methods: {
    onDecode(result) {
      console.log(result);
      this.decodedaddress = result;
    },
    onLoaded() {
      console.log(`Ready to start scanning barcodes`);
    },
    getBalance() {
      axios
        .get(
          `https://backend.zugavalize.io/wp-json/rimplenet/v1/user-wallet-balance/multi?wallet_id=usdt,bnb,zusd&formatted=yes&user_id=${this.currentUserData.id}`
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
        amount: parseFloat(this.amountToSwap),
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
        .post(
          `https://middleware.zugavalize.io/swap/${this.currentUserData.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${this.currentUser.access_token}`,
            },
          }
        )
        .then((res) => {
          this.loading = false;
          this.$toast.success("Swap Successful");
          this.$router.push("/transaction");

          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error(err.response.data.message);

          console.log(err);
        });
    },
    async getConversion(amountToSwap, fromCurrency, toCurrency) {
      try {
        const conversion = await axios.post(
          "https://middleware.zugavalize.io/converter",
          {
            amount: amountToSwap,
            wallet_from: fromCurrency,
            wallet_to: toCurrency,
          }
        );
        console.log(conversion.data.data);
        this.conversionObject = conversion?.data?.data || null;
        // converter = conversion.data.data;
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.message);
      }
    },
    async getNairaConversion(amountToSwap, fromCurrency, toCurrency) {
      try {
        const conversion = await axios.post(
          "https://middleware.zugavalize.io/converter",
          {
            amount: amountToSwap,
            wallet_from: fromCurrency,
            wallet_to: toCurrency,
          }
        );
        console.log(conversion.data.data);
        this.nairaConversionObject = conversion?.data?.data || null;
        // converter = conversion.data.data;
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response.data.message);
      }
    },
    async getEquivalent() {
      if (this.conversionObject) {
        let wallet_from = this.conversionObject.wallet_from.market_price;
        let wallet_to = this.conversionObject.wallet_to.market_price;
        this.equivalent = (wallet_from * this.amountToSwap) / wallet_to;
      } else {
        this.equivalent = 0;
      }
    },
    async getNairaEquivalent() {
      console.log(this.nairaConversionObject);
      if (this.nairaConversionObject) {
        let wallet_from = this.nairaConversionObject.wallet_from.market_price;
        let wallet_to = this.nairaConversionObject.wallet_to.market_price;
        this.nairaEquivalent = (wallet_from * this.amountToSwap) / wallet_to;
      } else {
        this.nairaEquivalent = 0;
      }
    },
  },
  components: {
    ActionLoader,
  },
};
</script>
