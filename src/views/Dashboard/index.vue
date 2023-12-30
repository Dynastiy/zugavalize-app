<!-- eslint-disable -->
<template>
  <div class="flex min-h-screen">
    <!-- <div
      class="toggle-menu px-4 bg-white fixed top-0 inset-x-0 flex justify-between items-center"
    >
      <a href="#" class="font-bold text-[#F0A500]">
        <img src="@/assets/Middey_Horizontal.png" class="logo" />
      </a>
      <div class="space-x-6 flex items-center">
        <button class=" ">
          <i class="fa-solid text-xl fa-bell"></i>
        </button>

        <button @click="toggle" class=" ">
          <i class="fa-solid text-xl fa-bars"></i>
        </button>
      </div>
    </div> -->

    <div
      class="md:ml-[300px] z-20 px-4 py-5 bg-yellow-600 text-[#fff] border-b border-white fixed top-0 inset-x-0 flex justify-between items-center"
    >
      <div class="font-bold capitalize flex gap-4 items-center">
        <button @click="toggle" class="md:hidden block">
          <i class="fa-solid text-xl fa-bars"></i>
        </button>
        <h1 class="">ZUGAVALIZE</h1>
        <!-- <img src="@/assets/horizontal_trans_sm.png" class="logo" /> -->

      </div>
      <div class="space-x-6 flex items-center">
        <button class=" ">
          <i class="fa-solid text-xl fa-bell"></i>
        </button>

        <!-- <button class=" ">
          <router-link to="#"
            ><img
              src="@/assets/Svg/user.svg"
              class="object-fit md:h-10 h-8 md:w-10 w-8"
          /></router-link>
        </button> -->
      </div>
    </div>

    <div
      v-if="isMobile"
      class="inset-0 bg-[#00000050] z-[3] absolute"
      @click="toggle"
    ></div>
    <div
      :class="[isMobile ? 'isOpen' : null, 'sidebar']"
      class="sidebar transform duration-500 md:w-[300px] w-[280px] z-20 h-screen md:flex flex-col justify-between bg-white pb-10"
    >
      <div>
        <div class="px-5">
          <div
            class="mt-10 border-t-2 border-black mx-auto uppercase shadow-md font-bold text-xl bg-[#fff] text-black h-28 w-full rounded-b-2xl mb-3"
          >
            <div
              class="bg-white mx-auto rounded-full h-14 w-14 transform -translate-y-7"
            >
              <img
                src="@/assets/Svg/user.svg"
                class="object-fit h-full w-full"
              />
            </div>
            <h2 class="font-medium mb-6 text-center">
              <span class="font-semibold"> {{ fullName }} </span>
            </h2>
          </div>
        </div>

        <div class="mt-4 px-5 space-y-2" @click="isMobile = false">
          <!-- Dashboard -->

          <router-link
            to="/dashboard"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('dashboard')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-home text-base`"></i
            ></span>
            <div class="w-10/12">Home</div>
          </router-link>

          <router-link
            to="/buyszc"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('buyszc')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-exchange text-base`"></i
            ></span>
            <div class="w-10/12">Buy SZC</div>
          </router-link>
          <router-link
            to="/scan"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('scan')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-qrcode text-base`"></i
            ></span>
            <div class="w-10/12">Scan</div>
          </router-link>
          <!-- Kyc -->

          <router-link
            to="/stablecoin"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('stablecoin')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-coins text-base`"></i
            ></span>
            <div class="w-10/12 font-bold text-red-500 animate animate-bounce">
              Stable Coins <span class="text-green-500">(New)</span>
            </div>
          </router-link>

<!-- Deposit -->
          <router-link
            to="deposit"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('deposit')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-file text-base`"></i
            ></span>
            <div class="w-10/12">Deposit</div>
          </router-link>


          <router-link
            to="/kyc"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('kyc')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-file text-base`"></i
            ></span>
            <div class="w-10/12">KYC/Compliance</div>
          </router-link>

          <!-- Transaction -->

          <div class="">
            <router-link
              to="/withdraw"
              class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
              :class="
                isActiveRoute('withdraw')
                  ? 'bg-yellow-600 text-[#fff]'
                  : 'text-[#515352]'
              "
            >
              <span class="w-2/12">
                <i :class="`fa-solid fa-exchange text-base`"></i
              ></span>
              <div class="w-10/12">Withdraw</div>
            </router-link>
          </div>
          <!-- Employee -->

          <router-link
            to="#"
            class="flex items-center hover:bg-yellow-300 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('billpayment')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-users text-base`"></i
            ></span>
            <div class="w-10/12">Bills Payment</div>
          </router-link>

          <!-- Payroll -->

          <router-link
            to="/transaction"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('transaction')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-credit-card text-base`"></i
            ></span>
            <div class="w-10/12">Transaction</div>
          </router-link>

          <!-- Settings -->
          <router-link
            to="/swap"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('swap')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-exchange text-base`"></i
            ></span>
            <div class="w-10/12">Swap</div>
          </router-link>

           <!-- Settings -->
          
       
          <!-- Settings -->
          <a
            target="_blank"
            href="https://oldwallet.zugacoin.io/dashboard-withdraw"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('Samzuga')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-exchange text-base`"></i
            ></span>
            <div class="w-10/12">Samzuga Wallet</div>
          </a>
       
          <!-- Settings -->
          <router-link
            to="/settings"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('setting')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-cog text-base`"></i
            ></span>
            <div class="w-10/12">Settings</div>
          </router-link>

          <!-- Support  -->
          <router-link
            to="/support"
            class="flex items-center hover:bg-yellow-600 hover:text-[#000] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('support')
                ? 'bg-yellow-600 text-[#fff]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-envelope text-base`"></i
            ></span>
            <div class="w-10/12">Support</div>
          </router-link>
        </div>
      </div>

      <div
        @click="logout"
        class="flex items-center transform duration-500 transition-all font-medium text-base rounded-md hover:bg-yellow-600 hover:text-[#000] mx-5 px-5 mt-10 py-2 cursor-pointer"
      >
        <span class="w-2/12">
          <i class="fa-solid fa-arrow-right-from-bracket"></i
        ></span>
        <div class="w-10/12">Logout</div>
      </div>
    </div>
    <div class="main bg-blue-50 py-10 h-screen overflow-y-auto">
      <router-view></router-view>
    </div>

    <Mobilenav :isActiveRoute="isActiveRoute" />
  </div>
</template>
<!-- eslint-disable -->

<script>
import { mapGetters } from "vuex";
import Mobilenav from "../../components/mobilenav.vue";
export default {
  name: "admin",
  data() {
    return {
      isMobile: false,
      isIntegrationActive: false,
    };
  },
  watch: {
    checkActivity() {
      // if (this.checkActivity) {
      //   this.logout();
      //   this.$swal("Timeout, Your session has expired");
      // }
    },
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    // pageHeader() {
    //   return this.$route.name;
    // },
    // checkMobile() {
    //   return this.isMobile;
    // },
    // checkActivity() {
    //   return this.$store.state.idleVue.isIdle;
    // },
    ...mapGetters(["currentUserData"]),
    fullName() {
      return `${this.currentUserData.first_name} ${this.currentUserData.last_name}`;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      localStorage.removeItem("vuex");
    },
    toggle() {
      this.isMobile = !this.isMobile;
    },
    toggleIntegration() {
      this.isIntegrationActive = !this.isIntegrationActive;
    },
    isActiveRoute(route) {
      if (this.currentPath.toLowerCase().includes(route)) {
        return true;
      }
    },
  },
  components: { Mobilenav },
};
</script>
<!-- eslint-disable -->

<style scoped>
.toggle-menu {
  display: none;
}
.sidebar {
  position: fixed;
  min-width: 300px;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  @apply overflow-x-hidden;
}
.sidebar::-webkit-scrollbar {
  width: 4px;
}
.sidebar::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background: #999;
}
.main {
  margin-left: 300px;
  width: 100%;
}
.logo {
  width: 200px;
  height: 40px;
  object-fit: contain;
}
.header-nav {
  background-image: url("../../assets/yellow-bg.jpg");
  /* height: 10px; */
}
@media screen and (max-width: 640px) {
  .logo {
    width: 100px;
    height: 20px;
    object-fit: contain;
  }
  .toggle-menu {
    display: flex;
  }

  .main {
    margin-left: 0;
  }

  .sidebar {
    left: -100vw;
    transition: all 0.2s linear;
  }
  .sidebar.isOpen {
    left: 0;
  }
}
</style>
