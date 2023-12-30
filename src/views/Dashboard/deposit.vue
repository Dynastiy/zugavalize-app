<!-- eslint-disable prettier/prettier -->
<template>
  <div>
    <div class="w-full py-16 px-4">
      <div class="p-4 bg-white">
        <div class="my-8 grid place-content-center max-w-2xl mx-auto">
          <h1 class="text-center font-bold mb-4 md:text-2xl">
            Deposit Address
          </h1>
          <div
            src="https://ps.w.org/doqrcode/assets/icon-256x256.png?rev=2143781"
            class="rounded-md border mx-auto"
            alt="QRcode"
          >
            <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
          </div>

          <div class="my-6 text-gray-500 text-center">
            Only send <strong>BNB, USDT and SZCB</strong> to this address.
            Sending any other asset to this address may result in the loss of
            your deposit!
          </div>

          <small>Note: On Android App, select the address to copy.</small>
          <div
            class="p-2 bg-gray-200 flex flex-wrap md:justify-between justify-center items-center rounded-md shadow-md"
          >
            <div class="max-w-max">
              <small id="address">
                {{
                  currentUserData?.eth_crypto_wallet_deposit_address || "null"
                }}</small
              >
            </div>
            <div class="ml-3 cursor-pointer">
              <!-- <img src="@/assets/Svg/copy.svg" alt=""  class="" /> -->
              <button
                data-clipboard-target="#address"
                class="btn bg-black outline-none p-2 mt-2 rounded-md text-white"
                @click="handleCopy(address)"
              >
                Copy
              </button>
              <!-- <button
                v-if="!webview"
                class="bg-black outline-none p-2 mt-2 rounded-md text-white"
                @click="handleCopy(address)"
              >
                Copy
              </button> -->
              <!-- <a
                :href="`http://app.zugavaize.io?app_action=COPY&text_to_copy=${address}`"
                v-if="webview"
                class="bg-black outline-none p-2 mt-2 rounded-md text-white"
              >
                Copy
              </a> -->
            </div>
          </div>

          <div class="text-red-500 mt-4 text-center">
            Note: We Only Support BEP20
          </div>
          <div class="text-center font-medium">
            <p>
              <span class="text-green-500">NGN deposit</span> will be enabled
              after KYC Compliance is completed.
            </p>
            <p>
              <span class="text-red-500">0% Fee</span> for deposit but merchant
              and bank charges may apply.
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
import PincodeInput from "vue-pincode-input";
import QrcodeVue from "qrcode.vue";

import { validationMixin } from "vuelidate";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
import ActionLoader from "../../components/ActionLoader.vue";

export default {
  name: "Settings",
  mixins: [validationMixin],
  validations: {
    phone_number: {
      required,
      numeric,
      minLength: minLength(11),
    },
  },
  data() {
    return {
      loading: false,
      address: "",
      size: 150,
      webview: "",
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    value() {
      return this.currentUserData.eth_crypto_wallet_deposit_address || "";
    },
  },
  mounted() {
    // if (!this.currentUserData?.nll_user_email_address_verified) {
    //   this.$toast.error("Email verification required ");

    //   this.$router.push("/settings");
    // }
    let standalone = window.navigator.standalone,
      userAgent = window.navigator.userAgent.toLowerCase(),
      safari = /safari/.test(userAgent),
      ios = /iphone|ipod|ipad/.test(userAgent);

    if (ios) {
      if (!standalone && safari) {
        // Safari
      } else if (!standalone && !safari) {
        // iOS webview
        this.webview = true;
      }
    } else {
      if (userAgent.includes("wv")) {
        this.webview = true;
      } else {
        // Chrome
      }
    }
    if (!this.currentUserData?.eth_crypto_wallet_deposit_address) {
      this.getAddress();
    }
    this.getBalance();
  },
  methods: {
    async handleCopy(item) {
      // await navigator.clipboard.writeText(item).then(() => {
      //   this.$toast.success("Copied");
      // });
      let thisInstance = this;
      var clipboard = new ClipboardJS(".btn");

      clipboard.on("success", function (e) {
        console.info("Action:", e.action);
        console.info("Text:", e.text);
        console.info("Trigger:", e.trigger);
        thisInstance.$toast.success("Copied");

        e.clearSelection();
      });

      clipboard.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
    },
    // async handleCopy(item) {
    //   await navigator.clipboard.writeText(item).then(() => {
    //     this.$toast.success("Copied");
    //   });
    // },
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
    getAddress() {
      axios
        .get(
          `https://middleware.zugavalize.io/generate-address/${this.currentUserData.id}`
        )
        .then((res) => {
          this.loading = false;
          this.address = res.data.data.address || "";
          console.log(res);
        });
    },
  },
  components: {
    PincodeInput,
    ActionLoader,
    QrcodeVue,
  },
};
</script>
