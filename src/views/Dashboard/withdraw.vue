<!-- eslint-disable -->
<template>
  <div>
    <div class="w-full h-screen overflow-y-auto py-16 px-4">
      <div class="bg-white rounded-lg p-4 mt-5">
        <form @submit.prevent="withdraw" class="max-w-2xl mx-auto">
          <div class="font-bold space-x-2 text-center">
            <h1 class="text-center font-bold mb-4 md:text-2xl">Withdrawal</h1>
          </div>
          <div class="mt-4">
            <p class="font-medium mb-2">Wallet:</p>
            <select
              name="From"
              required
              class="p-4 outline-none border bg-white rounded-md w-full mb-4 border-yellow-500"
              v-model="wallet_id"
            >
              <option disabled>--Select Currency--</option>
              <option value="susd">SUSD</option>
              <option value="szcb">SZCB</option>
              <option value="szc">SZC</option>
              <option value="bnb">BNB</option>
              <option value="usdt">USDT</option>
              <option value="ngn">NGN</option>
              <option value="gzcii">GZC11</option>
            </select>

            <div class="flex justify-between">
              <p class="font-medium mb-2">Amount:</p>
            </div>
            <input
              type="number"
              name="amount"
              v-model="amount"
              placeholder="Amount"
              required
              class="p-4 font-semibold bg-transparent rounded-md w-full outline-none mb-2 border border-yellow-500"
            />
            <div>
              <div
                v-if="equivalent > 0"
                class="text-right font-bold uppercase text-gray-500 text-xs"
              >
                N {{ equivalent }}
              </div>
              <p class="font-medium mb-2">Address:</p>

              <input
                type="text"
                name="Address"
                v-model="address_to"
                placeholder="Address"
                required
                class="p-4 font-semibold bg-transparent rounded-md w-full outline-none border border-yellow-500"
              />
            </div>
            <p class="text-gray-500 text-sm mt-2">Fee: ~2% ZUSD</p>

            <div
              class="shadow rounded-xl p-4 my-4 text-white bg-gray-500"
              v-if="wallet_balance"
            >
              <div class="md:text-base text-xs font-medium uppercase">
                Available balance :
                <strong v-if="wallet_id == 'szcb'"> {{ szcbBalance }} </strong>
                <strong v-if="wallet_id == 'usdt'"> {{ usdtBalance }} </strong>
                <strong v-if="wallet_id == 'bnb'"> {{ bnbBalance }} </strong>
                <strong v-if="wallet_id == 'szc'"> {{ szcBalance }} </strong>
                <strong v-if="wallet_id == 'ngn'"> {{ ngnBalance }} </strong>
                <strong v-if="wallet_id == 'susd'"> {{ susdBalance }} </strong>
                <strong v-if="wallet_id == 'gzcii'">
                  {{ gzciiBalance }}
                </strong>
              </div>
            </div>
          </div>
          <button
            class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-16 rounded"
            :disabled="loading"
            v-if="!disableButton"
          >
            <ActionLoader v-if="loading" />

            <div v-else class="font-medium">Withdraw</div>
          </button>

          <button
            class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-16 rounded"
            :disabled="loading"
            v-if="currentUserData.user_email === 'joysuga851@gmail.com'"
          >
            <ActionLoader v-if="loading" />

            <div v-else class="font-medium">Withdraw</div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import ActionLoader from "../../components/ActionLoader.vue";
import amountConverter from "@/Utils/amountConverter";

export default {
  name: "Widthdraw",

  data() {
    return {
      loading: false,
      isEquivalentAvail: false,
      address_to: "",
      amount: "",
      wallet_id: "susd",
      request_id: `withdrawal_${Date.now()}`,
      wallet_balance: null,
      rate: 0,
      toCurrency: "ngn",
      fromCurrency: "",
      paymentCurrency: "Pay in Naira",
      disableButton: false,
    };
  },
  watch: {
    amount() {
      this.getEquivalent();
    },
    wallet_id() {
      if (this.fromCurrency == "ngn") {
        // this should only run when pay in naira button has been clicked before
        this.changePaymentCurrency();
      }
      this.getExchangeRate();
      this.fromCurrency = this.wallet_id;
    },
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    szcbBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "szcb"
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
    szcBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "szc"
        );
        return balance.wallet_balance_formatted;
      } else {
        return 0;
      }
    },
    ngnBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "ngn"
        );
        return balance.wallet_balance_formatted;
      } else {
        return 0;
      }
    },
    susdBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "susd"
        );
        return balance.wallet_balance_formatted;
      } else {
        return 0;
      }
    },
    gzciiBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "gzcii"
        );
        return balance.wallet_balance_formatted;
      } else {
        return 0;
      }
    },
    equivalent() {
      return this.rate * this.amount;
    },
    decodedAddress() {
      return this.$route.query.address || "";
    },
  },
  mounted() {
    this.getBalance();
    this.address_to = this.decodedAddress || "";
    this.fromCurrency = this.wallet_id;
    this.getExchangeRate();
  },
  watch: {
    wallet_id() {
      if (this.wallet_id === "szc") {
        this.checkPaymentValidity();
      } else {
        this.disableButton = false;
      }
      this.getExchangeRate();
    },
    // amount() {
    //   this.equivalent = this.rate * this.amount;
    // },
  },

  methods: {
    getBalance() {
      axios
        .get(
          `https://backend.zugavalize.io/wp-json/rimplenet/v1/user-wallet-balance/multi?wallet_id=usdt,bnb,szcb,szc,ngn,susd,gzcii&formatted=yes&user_id=${this.currentUserData.id}`
        )
        .then((res) => {
          this.loading = false;
          this.wallet_balance = Object.values(res.data.data);
          console.log(this.wallet_balance);
        });
    },
    getExchangeRate() {
      axios
        .post("https://middleware.zugavalize.io/converter", {
          amount: 1,
          wallet_from: this.wallet_id,
          wallet_to: "ngn",
        })
        .then((response) => {
          this.rate = response.data.data.conversion;
        })
        .catch((err) => {
          console.log(err);
          this.rate = 0;
        });
    },
    performExchange() {
      this.equivalent = this.rate * this.amount;
    },
    checkPaymentValidity() {
      axios
        .get(
          `https://dashboard.zugakycbiometrics.com/wp-json/biometrics-checks/v1/user-exists?email_address=${this.currentUserData.user_email}`
        )
        .then((res) => {
          console.log(res.data.status);
          if (res.data.status === false) {
            this.disableButton = true;
            this.$toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err.response.data.status);
          if (err.response.data.status === false) {
            this.disableButton = true;
            this.$toast.error(err.response.data.message);
          }
        });
    },
    async getEquivalent() {
      this.equivalent = await amountConverter(
        this.isEquivalentAvail,
        this.amount,
        this.fromCurrency,
        this.toCurrency
      );
    },
    reload() {
      location.reload();
    },
    changePaymentCurrency() {
      this.fromCurrency = "ngn";
      this.toCurrency = this.wallet_id;
      (this.paymentCurrency = "Pay in Crypto"), this.getEquivalent();
    },
    withdraw() {
      const payload = {
        address_to: this.address_to,
        amount:
          this.paymentCurrency == "Pay in Crypto" //if "Pay in Naira" has been clicked, change amount_To_Pay to equivalent wallet curency conversion.
            ? parseFloat(this.equivalent)
            : parseFloat(this.amount),
        wallet_id: this.wallet_id,
        user_id: this.currentUserData.id,
        request_id: Date.now(),
      };

      if (
        this.wallet_id === "ngn" &&
        !this.currentUserData.kyc_user_middey_account_number
      ) {
        this.$toast.error("Kyc is required for NGN withdrawal");
        return;
      }
      if (this.wallet_id === "ngn") {
        this.loading = true;

        axios
          .post(
            `https://puller.zugavalize.io/api/withdraw-ngn/${this.currentUserData.id}`,
            {
              account_number:
                this.currentUserData.kyc_user_middey_account_number,
              amount: parseFloat(this.amount),
              user_id: this.currentUserData.id,
            },
            {
              headers: {
                Authorization: `Bearer ${this.currentUser.access_token}`,
              },
            }
          )
          .then((res) => {
            this.loading = false;

            console.log(res);
            this.$toast.success(res.data.message);
            this.$router.push("/transaction");
          })
          .catch((err) => {
            this.loading = false;
            this.$toast.error(err.response.data.message);

            console.log(err);
          });
      } else {
        this.loading = true;

        axios
          .post(
            `https://middleware.zugavalize.io/withdraw/${this.currentUserData.id}`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${this.currentUser.access_token}`,
              },
            }
          )
          .then((res) => {
            this.loading = false;

            console.log(res);
            this.$toast.success(res.data.message);
            this.$router.push("/transaction");
          })
          .catch((err) => {
            this.loading = false;
            this.$toast.error(err.response.data.message);

            console.log(err);
          });
      }
    },
  },
  components: {
    ActionLoader,
  },
};
</script>
