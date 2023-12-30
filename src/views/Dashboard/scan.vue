<!-- eslint-disable -->
<template>
  <div>
    <div class="w-full h-screen overflow-y-auto py-16 px-4">
      <div class="bg-white rounded-lg p-4 mt-5">
        <div class="max-w-2xl mx-auto">
          <div class="fixed top-20 inset-x-0">
            <StreamBarcodeReader
              @decode="onDecode"
              @loaded="onLoaded"
              v-if="onScanner"
            />
          </div>

          <div class="" :class="onScanner ? 'mt-[300px]' : 'mt-4'">
            <div class="flex justify-center">
              <a v-if="webview" :href="fingerPrintAppAction">
                {{ scannerState }} Scanner
              </a>
              <button
                v-else
                @click="handleScanner"
                class="mt-2 p-3 rounded text-white"
                :class="onScanner ? 'bg-red-500' : 'bg-green-600'"
              >
                {{ scannerState }} Scanner
              </button>
            </div>
            <div class="flex flex-wrap text-center justify-center mt-5">
              <p>Scan Info Detected:</p>
              <small>{{ decodedaddress }}</small>
            </div>

            <div
              class="text-xs space-x-2 flex justify-center mt-4"
              v-if="decodedaddress"
            >
              <router-link
                :to="`/withdraw?address=${decodedaddress}`"
                class="bg-yellow-600 outline-none p-3 rounded-md text-white"
              >
                Send Coin
              </router-link>
              <router-link
                :to="`/withdraw?address=${decodedaddress}`"
                class="bg-yellow-600 outline-none p-3 rounded-md text-white"
              >
                Pay Merchant
              </router-link>
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
import { mapGetters } from "vuex";
import ActionLoader from "../../components/ActionLoader.vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { decode as base64_decode } from "base-64";
export default {
  name: "Swap",

  data() {
    return {
      loading: false,
      onScanner: false,
      decodedaddress: "",
      scannerState: "Start",
      webview: false,
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    fingerPrintAppAction() {
      return `https://app.zugavalize.io/scan/?APP_ACTION=SCANNERACTIVITY`;
    },
  },
  mounted() {
    this.decodedaddress = this.$route.query?.result || "";

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
  },
  methods: {
    onDecode(result) {
      console.log(result);
      this.decodedaddress = result;
      if (result) {
        this.onScanner = false;
        this.scannerState = "Start";
      }
    },
    onLoaded() {
      console.log(`Ready to start scanning barcodes`);
    },
    handleScanner() {
      if (this.onScanner) {
        this.onScanner = !this.onScanner;
        this.scannerState = "Start";
      } else {
        this.decodedaddress = "scanning...";
        this.onScanner = !this.onScanner;
        this.scannerState = "Stop";
      }
    },
    handleSwap() {
      this.loading = true;
      const payload = {
        request_id: `id_${Date.now()}`,
        amount: this.amountToSwap,
        user_id: this.currentUserData.id,
        wallet_from: this.fromCurrency,
        wallet_to: this.toCurrency,
      };

      axios
        .post(
          "https://backend.zugavalize.io/wp-json/rimplenet-wallet-addon/v1/swap",
          payload
        )
        .then((res) => {
          this.loading = false;
          this.$toast.success(res.data.message);

          console.log(res);
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error(err.response.data.message);

          console.log(err);
        });
    },
  },
  components: {
    ActionLoader,
    StreamBarcodeReader,
  },
};
</script>
