<!-- eslint-disable -->
<template>
  <div class="py-16 px-4">
    <div class="flex font-bold text-base md:mt-10 mb-2">
      Transaction History
    </div>

    <div v-if="loading" class="bg-white flex justify-center items-center py-28">
      <Spinner />
    </div>
    <div v-else class="">
      <div class="">
        <div class="py-8 w-11/12 mx-auto">
          <h1 class="font-bold text-xl">Transactions</h1>
          <div class="grid md:grid-cols-4 gap-4 mt-2">
            <div
              class="shadow rounded-xl p-5 bg-white space-y-4"
              v-for="(item, key) in TransactionDetails.slice(0, 12)"
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
                    item.txn_type == 'CREDIT'
                      ? 'text-green-600'
                      : 'text-red-600'
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
          <div class="mt-4 flex items-center justify-between">
            <button
              :class="page !== 1 ? 'opacity-100' : 'opacity-0'"
              @click="prevHandler"
              class="flex justify-center items-center space-x-3 bg-[#F0A500] text-white px-8 py-3 rounded w-auto"
            >
              Prev {{ page }}
            </button>
            <button
              @click="paginationHandler"
              class="flex justify-center ml-auto items-center space-x-3 bg-[#F0A500] text-white px-8 py-3 rounded w-auto"
            >
              Next
              {{ page + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import moment from "moment";

import { mapGetters } from "vuex";

import axios from "axios";
import Spinner from "../../components/AppSpinner.vue";
export default {
  name: "Transaction",
  components: {
    Spinner,
  },
  data() {
    return {
      searchQuery: "",
      loading: false,
      page: 1,
      TransactionDetails: [],
      transactionMobileData: {},
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  mounted() {
    this.getTransactionHistory();
  },
  methods: {
    paginationHandler() {
      this.page++;
      this.getTransactionHistory();
    },
    prevHandler() {
      this.page--;
      this.getTransactionHistory();
    },
    async getTransactionHistory() {
      this.loading = true;
      await axios
        .get(
          `https://backend.zugavalize.io/wp-json/rimplenet/v1/transactions?user_id=${this.currentUserData.id}&pageno=${this.page}`
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
    getDate(Format, date) {
      return moment(date).format(Format);
    },
  },
};
</script>

<style scoped>
.progress-spinner-demo-wrapper {
  display: flex;
  flex-flow: row wrap;
  /* height: 150px; */
  align-items: center;
  width: 80%;
}

@media (max-width: 450px) {
  .progress-spinner-demo-wrapper {
    height: max-content;
  }
}
</style>
