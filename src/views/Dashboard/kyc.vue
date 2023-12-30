<!-- eslint-disable -->
<template>
  <div>
    <Loader v-if="false" />
    <div class="w-full py-16 px-4">
      <div class="bg-white rounded-md p-4 mt-10">
        <form @submit.prevent="submitForm">
          <div class="flex flex-col space-y-2 divide-y">
            <div>
              <div class="font-bold">
                SETTLEMENT ACCOUNT DETAILS
                <span
                  class="text-green-500"
                  v-if="currentUserData.kyc_user_middey_account_number"
                >
                  - Completed
                </span>
              </div>
              <div v-if="currentUserData.kyc_user_middey_account_number">
                <div class="flex space-x-2 mt-4 font-medium">
                  <p>Account Number:</p>
                  <p>{{ currentUserData.kyc_user_middey_account_number }}</p>
                </div>
                <div class="flex space-x-2 mt-2 font-medium">
                  <p>Phone Number:</p>
                  <p>{{ currentUserData.kyc_user_phone_number }}</p>
                </div>
              </div>
              <div class="my-2 md:11/12">
                <small> Setup your settlement account for your trade. </small>
                <p class="mt-4 font-medium text-sm md:text-base">
                  <span class="text-red-500">
                    <i
                      class="fa fa-exclamation-triangle text-yellow-500 mr-2"
                    ></i>
                    Note:</span
                  >
                  We recommend opening an account at
                  <a
                    href="https://app.middey.com"
                    class="text-blue-500"
                    target="_blank"
                    >https://app.middey.com</a
                  >
                  as it will offer faster settlement. Currently
                  enabled/available banks for settlement: Wema Bank.
                </p>
              </div>
              <div class="mb-5">
                <label class="font-medium mb-2">Bank Name </label>

                <div class="border py-3 px-4 flex items-center space-x-2">
                  <input
                    type="text"
                    required
                    value="WEMA BANK"
                    class="truncate outline-none w-full bg-transparent"
                    readonly
                  />
                </div>
              </div>

              <div>
                <label class="font-medium mb-2">Account Number </label>
                <div class="border py-3 px-4 flex items-center space-x-2">
                  <input
                    type="number"
                    required
                    oninput="javascript: if (this.value.length > 11) this.value = this.value.slice(0, 11);"
                    maxlength="10"
                    placeholder="Acct number"
                    class="truncate outline-none w-full bg-transparent"
                    v-model="acctNumber"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-2 py-2">
              <p class="font-medium">Phone Number</p>
              <div class="border py-3 px-4">
                <input
                  type="number"
                  required
                  oninput="javascript: if (this.value.length > 11) this.value = this.value.slice(0, 11);"
                  maxlength="11"
                  placeholder="xxxxxxxxxxx"
                  class="truncate outline-none w-full bg-transparent"
                  v-model="phone_number"
                />
              </div>
            </div>
            <div class="space-y-2 py-2">
              <p class="font-medium">BVN</p>
              <div class="border py-3 px-4">
                <input
                  type="number"
                  required
                  oninput="javascript: if (this.value.length > 11) this.value = this.value.slice(0, 11);"
                  maxlength="11"
                  placeholder="xxxxxxxxxxx"
                  class="truncate outline-none w-full bg-transparent"
                  v-model="bvn"
                />
              </div>
            </div>
          </div>

          <button

            v-if="!currentUserData.kyc_user_middey_account_number"
            class="flex justify-center items-center space-x-3 bg-[#F0A500] text-white px-8 py-3 rounded w-auto mx-auto mt-1"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
            ></div>

            <div v-else class="font-medium">Submit settlement account</div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import LvDropdown from "lightvue/dropdown";
import PincodeInput from "vue-pincode-input";
import { validationMixin } from "vuelidate";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import axios from "axios";
import { mapGetters } from "vuex";
import Loader from "../../components/Loader.vue";
import ActionLoader from "../../components/ActionLoader.vue";
import { refreshUser } from "../../Utils/refreshUser";
export default {
  mixins: [validationMixin],
  validations: {
    first_name: {
      required,
    },
    last_name: {
      required,
    },
  },

  data() {
    return {
      verifyName: false,
      loading: false,
      loadingPageData: false,
      isAcctAvail: false,
      phone_number: "",
      bvn: "",
      type: "password",
      showPasswordtoggle: false,
      bankListIsOpen: false,
      acctNumber: "",
      accountDetails: {
        account_name: " ",
        account_number: "",
      },
      bankSelectedName: "",
      bankSelectedAcctNumber: "",
      selectedBank: null,
      banks: [],
      first_name: "",
      last_name: "",
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  mounted() {
    // if (this.currentUserData.nll_user_email_address_verified !== "yes") {
    //   this.$toast.error("Email, phone number and BVN must be verified");

    //   this.$router.push("/settings");
    // }
    this.getBanks();
    (this.first_name = this.currentUserData.first_name),
      (this.last_name = this.currentUserData.last_name),
      (this.bankSelectedName =
        this.currentUserData.account_details_for_settlement_default?.account_bank);
    this.bankSelectedAcctNumber =
      this.currentUserData.account_details_for_settlement_default?.account_number;
  },
  methods: {
    showPassword() {
      this.showPasswordtoggle = !this.showPasswordtoggle;
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // this.verifyName = false;
        this.loading = true;
        axios
          .post("https://fund-zugavalize.herokuapp.com/update-kyc", {
            kyc_user_account_bvn: this.bvn,
            kyc_user_phone_number: this.phone_number,
            kyc_user_middey_account_number: this.acctNumber,
            kyc_user_middey_account_bank_name: "WEMA BANK",
            user_id: this.currentUserData.id,
          })
          .then((response) => {
            this.loading = false;
            this.$toast.success("Kyc updated successfully");
            refreshUser(
              this.currentUserData.id,
              this.currentUser.access_token,
              this.$store
            );
            location.reload();
          })
          .catch((err) => {
            this.$toast.error(err.response.data.message);
            this.loading = false;
          });
      }
    },
    getBanks() {
      this.loadingPageData = true;
      axios
        .get("https://middey-resolve-account.herokuapp.com/api/banks/ng")
        .then((response) => {
          this.banks = response.data;
          this.loadingPageData = false;
        })
        .catch((err) => {
          this.loadingPageData = false;
        });
    },
    handleBankSelection() {
      if (this.bankSelected !== "") {
        this.selectedBank = this.banks.find(
          (bank) => bank.name.toLowerCase() == this.bankSelected.toLowerCase()
        );
      }
    },
    getAccountOwner(e) {
      if (e.target.value.length > 9) {
        this.isAcctAvail = true;
        axios
          .post(
            "https://middey.baremind.co.za/api/resolve-account-details/ng",
            {
              account_number: this.acctNumber,
              account_bank: this.selectedBank.code,
            }
          )
          .then((response) => {
            this.isAcctAvail = false;
            if (response.data.status == "error") {
              this.$toast.error("Sorry, reciepient account not found");
              this.accountDetails.account_name = "";
            } else {
              this.isAcctAvail = false;

              this.accountDetails.account_name =
                response.data.data.account_name;
              this.accountDetails.account_number =
                response.data.data.account_number;
            }
          })
          .catch((err) => {
            this.isAcctAvail = false;
          });
      } else {
        this.accountDetails.account_name = "";
      }
    },
  },
  components: { PincodeInput, Loader, LvDropdown, ActionLoader },
};
</script>

<style scoped>
.otp-input {
  width: 10px;
  height: 10px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input.error {
  border: 1px solid red !important;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.verified {
  @apply bg-green-200 text-green-700 font-bold text-[10px] py-[4px] px-2 rounded-3xl;
}
.not-verified {
  @apply bg-pink-200 text-pink-700 font-bold text-[10px] py-[4px] px-2 rounded-3xl;
}

.overlay {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
.booknow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
}
.el-select,
.el-input {
  width: 100%;
}
</style>
