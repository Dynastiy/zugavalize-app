<!-- eslint-disable -->
<template>
  <div>
    <div class="w-full py-16 px-4">
      <div class="bg-white rounded-lg p-4 mt-5">
        <div class="font-bold space-x-2">
          <div>Bill Payment</div>
        </div>

        <h1 class="font-medium my-4">Mobile Top-up</h1>

        <div class="max-w-2xl mx-auto">
          <div class="bg-[#f7f7f7] p-2 grid grid-cols-2 mb-4">
            <button
              @click="handletab(1)"
              class="px-10 py-2 font-medium rounded-lg text-xs md:text-base"
              :class="tab1 ? 'bg-yellow-600 text-white' : ' text-black'"
            >
              Airtime
            </button>
            <button
              @click="handletab(2)"
              class="px-10 py-2 font-medium rounded-lg text-xs md:text-base"
              :class="tab2 ? 'bg-yellow-600 text-white' : ' text-black'"
            >
              Data Bundles
            </button>
          </div>
          <div
            class="rounded outline-none my-4 duration-300 p-4 bg-[#333] text-white font-medium"
          >
            Your Balance: {{ zngnBalance }}
          </div>
          <label class="font-medium mt-4 mb-2">Select Network Provider</label>
          <div class="bg-[#f7f7f7] p-2 grid grid-cols-4 gap-4 mb-4">
            <div class="relative p-2 rounded border" @click="getNetwork('mtn')">
              <Checker v-if="network === 'mtn'" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/New-mtn-logo.jpg/800px-New-mtn-logo.jpg"
                alt=""
                class="tranform hover:scale-110 duration-300"
              />
            </div>
            <div
              class="relative p-2 rounded border"
              @click="getNetwork('etisalat')"
            >
              <Checker v-if="network === 'etisalat'" />
              <img
                src="https://www.seekpng.com/png/detail/344-3443327_9mobile-mtn-glo-airtel-and-9mobile.png"
                alt=""
                class="tranform hover:scale-110 duration-300"
              />
            </div>
            <div class="relative p-2 rounded border" @click="getNetwork('glo')">
              <Checker v-if="network === 'glo'" />

              <img
                src="https://p.kindpng.com/picc/s/464-4648442_glo-offices-in-nigeria-hd-png-download.png"
                alt=""
                class="tranform hover:scale-110 duration-300"
              />
            </div>
            <div
              class="relative p-2 rounded border"
              @click="getNetwork('airtel')"
            >
              <Checker v-if="network === 'airtel'" />

              <img
                src="https://logos-download.com/wp-content/uploads/2016/07/Airtel_logo_logotype_emblem.png"
                alt=""
                class="tranform hover:scale-110 duration-300"
              />
            </div>
          </div>

          <div class="airtime" v-if="tab1">
            <label class="font-medium my-4">Mobile Number</label>

            <div class="mb-4">
              <input
                type="number"
                name="Number"
                v-model="phone"
                placeholder="Phone Number"
                class="p-4 font-semibold bg-transparent border w-full outline-none"
              />
            </div>
            <div class="text-red-500 w-full text-xs md:text-base">
              <p v-if="!$v.network.required && $v.network.$dirty" class="">
                Network is required!
              </p>
            </div>

            <label class="font-medium my-4">Select Amount</label>
            <div
              class="bg-[#f7f7f7] p-2 grid md:grid-cols-4 grid-cols-2 gap-4 mb-2"
            >
              <button
                @click="getAmount(100)"
                class="rounded outline-none hover:bg-yellow-600 hover:text-black duration-300 p-4 bg-[#333] text-center text-white font-medium"
              >
                N 100.00
              </button>
              <button
                @click="getAmount(500)"
                class="rounded outline-none hover:bg-yellow-600 hover:text-black duration-300 p-4 bg-[#333] text-center text-white font-medium"
              >
                N 500.00
              </button>
              <button
                @click="getAmount(1000)"
                class="rounded outline-none hover:bg-yellow-600 hover:text-black duration-300 p-4 bg-[#333] text-center text-white font-medium"
              >
                N 1000.00
              </button>
              <button
                @click="getAmount(2000)"
                class="rounded outline-none hover:bg-yellow-600 hover:text-black duration-300 p-4 bg-[#333] text-center text-white font-medium"
              >
                N 2000.00
              </button>
            </div>

            <div class="mb-4">
              <input
                type="number"
                name="amount"
                v-model="amount"
                placeholder="Amount"
                class="p-4 font-semibold bg-transparent border w-full outline-none"
              />
            </div>
            <div class="text-red-500 w-full text-xs md:text-base">
              <p v-if="!$v.amount.required && $v.amount.$dirty" class="">
                Amount is required!
              </p>
            </div>
            <button
              @click="buyAirtime"
              class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-10 rounded"
              :disabled="loading"
            >
              <ActionLoader v-if="loading" />

              <div v-else class="font-medium">Buy Airtime</div>
            </button>
          </div>
          <div class="text-center text-red-500 w-full text-xs md:text-base">
            {{ isError }}
          </div>

          <div class="airtime" v-if="tab2">
            <label class="font-medium my-4">Mobile Number</label>

            <div class="mb-4">
              <input
                type="number"
                name="Number"
                v-model="phone"
                placeholder="Phone Number"
                class="p-4 font-semibold bg-transparent border w-full outline-none"
              />
            </div>
            <div class="text-red-500 w-full text-xs md:text-base">
              <p v-if="!$v.phone.required && $v.phone.$dirty" class="">
                Phonenumber is required!
              </p>
            </div>

            <label class="font-medium my-4">Select Data Plan</label>

            <div class="mb-4">
              <select
                name="data-plan"
                class="p-4 outline-none border bg-white border-yellow-200 rounded-md w-full"
                v-model="variation_id"
              >
                <option disabled>--Select Plan--</option>

                <option value="500" class="py-4">
                  MTN SME Data 500MB – 30 Days
                </option>
                <option selected value="M1024">
                  MTN SME Data 1GB – 30 Days
                </option>
                <option value="M2024">MTN SME Data 2GB – 30 Days</option>
                <option value="3000">MTN SME Data 3GB – 30 Days</option>
                <option value="5000">MTN SME Data 5GB – 30 Days</option>
                <option value="10000">MTN SME Data 10GB – 30 Days</option>
                <option value="mtn-20hrs-1500">MTN Data 6GB – 7 Days</option>
                <option value="mtn-30gb-8000">MTN Data 30GB – 30 Days</option>
                <option value="mtn-40gb-10000">MTN Data 40GB – 30 Days</option>
                <option value="mtn-75gb-15000">MTN Data 75GB – 30 Days</option>
                <option value="glo100x">Glo Data 1GB – 5 Nights</option>
                <option value="glo200x">
                  Glo Data 1.25GB – 1 Day (Sunday)
                </option>
                <option value="G500">Glo Data 1.35GB – 14 Days</option>
                <option value="G2000">Glo Data 5.8GB – 30 Days</option>
                <option value="G1000">Glo Data 2.9GB – 30 Days</option>
                <option value="G2500">Glo Data 7.7GB – 30 Days</option>
                <option value="G3000">Glo Data 10GB – 30 Days</option>
                <option value="G4000">Glo Data 13.25GB – 30 Days</option>
                <option value="G5000">Glo Data 18.25GB – 30 Days</option>
                <option value="G8000">Glo Data 29.5GB – 30 Days</option>
                <option value="glo10000">Glo Data 50GB – 30 Days</option>
                <option value="airt-500">Airtel Data 750MB – 14 Days</option>
                <option value="airt-300x">Airtel Data 1GB – 1 Day</option>
                <option value="AIR1000">Airtel Data 1.5GB – 30 Days</option>
                <option value="airt-500x">Airtel Data 2GB – 2 Days</option>
                <option value="airt-1200">Airtel Data 2GB – 30 Days</option>
                <option value="Air1500">Airtel Data 3GB – 30 Days</option>
                <option value="AIR2000">Airtel Data 4.5GB – 30 Days</option>
                <option value="airt-1500-2">
                  airt-1500-2- Airtel Data 6GB – 7 Days
                </option>
                <option value="Air3000">Airtel Data 10GB – 30 Days</option>
                <option value="Air5000">Airtel Data 20GB – 30 Days</option>
                <option value="Air100000">Airtel Data 40GB – 30 Days</option>
                <option value="9MOB1000">9mobile Data 1GB – 30 Days</option>
                <option value="9MOB34500">9mobile Data 2.5GB – 30 Days</option>
                <option value="9MOB8000">9mobile Data 11.5GB – 30 Days</option>
                <option value="9MOB5000">9mobile Data 15GB – 30 Days</option>
              </select>
            </div>
            <div class="text-red-500 w-full text-xs md:text-base">
              <p
                v-if="!$v.variation_id.required && $v.variation_id.$dirty"
                class=""
              >
                No Plan selected
              </p>
            </div>
            <button
              @click="buyData"
              class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-10 rounded"
              :disabled="loading"
            >
              <ActionLoader v-if="loading" />

              <div v-else class="font-medium">Buy Data</div>
            </button>
            <div class="text-center text-red-500 w-full text-xs md:text-base">
              {{ isDataError }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import axios from "axios";
import PincodeInput from "vue-pincode-input";

import { validationMixin } from "vuelidate";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import ActionLoader from "../../components/ActionLoader.vue";
import Checker from "../../components/checker.vue";

export default {
  name: "BillPayment",
  mixins: [validationMixin],
  validations: {
    phone: {
      required,
      numeric,
      minLength: minLength(11),
    },
    amount: {
      required,
    },
    network: {
      required,
    },
    variation_id: {
      required,
    },
  },
  data() {
    return {
      loading: false,
      tab1: true,
      tab2: false,
      phone: null,
      amount: null,
      network: "",
      variation_id: "",
      wallet_balance: null,
      isDataError: "",
      isError: "",
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    zngnBalance() {
      if (this.wallet_balance) {
        const balance = this.wallet_balance.find(
          (item) => item.wallet_id === "zngn"
        );
        return balance.wallet_balance_formatted;
      } else {
        return 0;
      }
    },
  },
  mounted() {
    this.getBalance();
  },
  methods: {
    getAmount(amount) {
      this.amount = amount;
    },
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
    getNetwork(network) {
      this.network = network;
      console.log(network);
    },
    getBalance() {
      axios
        .get(
          `https://backend.zugavalize.io/wp-json/rimplenet/v1/user-wallet-balance/multi?wallet_id=btc,szcb,usdt,bnb,zusd,zngn,szc,eth,ngn,usd&formatted=yes&user_id=${this.currentUserData.id}`
        )
        .then((res) => {
          this.loading = false;

          this.wallet_balance = res.data.data;
        });
    },
    buyData() {
      if (
        !this.$v.variation_id.$invalid &&
        !this.$v.network.$invalid &&
        !this.$v.phone.$invalid
      ) {
        this.loading = true;
        const payload = {
          phone: this.phone,
          network_id: this.network,
          variation_id: this.variation_id,
          wallet_id: "zngn",
          user_id: this.currentUserData.id,
        };

        axios
          .post("https://billing-vendor.herokuapp.com/api/data", payload)
          .then((res) => {
            this.loading = false;


            console.log(res);
            this.$toast.success(res.data.message);
            this.$router.push('/transaction')
          })
          .catch((err) => {
            this.loading = false;
            this.$toast.error(err.response.data.message);

            console.log(err);
          });
          this.isDataError = "";
      } else {
        this.isDataError = "All Fields are required";
      }
    },
    buyAirtime() {
      if (
        !this.$v.network.$invalid &&
        !this.$v.amount.$invalid &&
        !this.$v.phone.$invalid
      ) {
        this.loading = true;
        const payload = {
          phone: this.phone,
          amount: this.amount,
          network_id: this.network,
          wallet_id: "zngn",
          user_id: this.currentUserData.id,
        };

        axios
          .post("https://billing-vendor.herokuapp.com/api/airtime", payload)
          .then((res) => {
            this.loading = false;
            log;
            this.$toast.success(res.data.message);
            this.$router.push('/transaction')
          })
          .catch((err) => {
            this.loading = false;
            this.$toast.error(err.response.data.message);

            console.log(err);
          });
        this.isError = "";
      } else {
        this.isError = "All Fields are required";
      }
    },
  },
  components: {
    PincodeInput,
    ActionLoader,
    Checker,
  },
};
</script>
