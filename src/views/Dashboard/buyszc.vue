<!-- eslint-disable -->
<template>
  <div>
    <div class="w-full h-screen overflow-y-auto py-16 px-4">
      <div class="bg-white rounded-lg p-4 mt-5">
        <div class="max-w-2xl mx-auto">
          <div class="font-bold space-x-2 text-center">
            <div>Buy SZC</div>
          </div>

          <div class="grid md:grid-cols-2 gap-4 mt-4">
            <div class="w-full">
              <p class="font-medium mb-2">Buy:</p>
              <div class="w-full gap-2 bg-[#f7f7f7]">
                <div class="col-span-8">
                  <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    value="₦11,000"
                    readonly
                    class="p-4 font-semibold bg-transparent w-full outline-none"
                  />
                </div>
              </div>
            </div>
            <div class="w-full">
              <p class="font-medium mb-2">Get:</p>

              <div class="bg-[#f7f7f7]">
                <input
                  type="text"
                  name="whatyouget"
                  value="0.002 SZC"
                  readonly
                  class="p-4 font-semibold bg-transparent w-full outline-none"
                />
              </div>
            </div>
          </div>

          <button
            @click="handlePurchase"
            class="flex justify-center items-center max-w-max mx-auto bg-[#F0A500] text-black md:px-20 px-8 py-3 mt-16 rounded"
            :disabled="loading"
          >
            <ActionLoader v-if="loading" />

            <div v-else class="font-medium">Buy Now</div>
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

export default {
  name: "Swap",

  data() {
    return {
      isEquivalentAvail: false,
      loading: false,
      wallet_balance: null,

      decodedaddress: "",
      equivalent: 0,
      nairaEquivalent: null,
    };
  },

  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },

  methods: {
    handlePurchase() {
      this.loading = true;
      const payload = {
        request_id: `id_${Date.now()}`,
        amount: 11000,
        user_id: this.currentUserData.id,
        wallet_from: "ngn",
        wallet_to: "szc",
      };

      axios
        .post(`https://coinrimp-buy-szc.herokuapp.com/exchange/szc/`, payload, {
          headers: {
            Authorization: `Bearer ${this.currentUser.access_token}`,
          },
        })
        .then((res) => {
          this.loading = false;
          this.$toast.success("Purchase Successful");
          this.$router.push("/transaction");

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
  },
};
</script>
