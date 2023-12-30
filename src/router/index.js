/*eslint-disable  */

import Vue from "vue";
import VueRouter from "vue-router";
// Auth Routes
import Login from "@/views/login.vue";
import Register from "@/views/register.vue";
import Forgotpassword from "@/views/forgotpassword.vue";
import Resetpassword from "@/views/resetpassword.vue";
import Changepassword from "@/views/changepassword.vue";
import AccountDeactivation from "@/views/deactivate.vue";
import Support from "@/views/support.vue";

// Dasboard Routes
import Index from "@/views/Dashboard/index.vue";
import VerifyEmail from "@/views/Dashboard/VerifyEmail.vue";
import Dashboard from "@/views/Dashboard/dashboard.vue";
import Swap from "@/views/Dashboard/swap.vue";
import Scan from "@/views/Dashboard/scan.vue";
import Withdraw from "@/views/Dashboard/withdraw.vue";
import Deposit from "@/views/Dashboard/deposit.vue";
import Settings from "@/views/Dashboard/settings.vue";
import Billpayment from "@/views/Dashboard/billpayment.vue";
import Stablecoin from "@/views/Dashboard/stablecoin.vue";
import Transaction from "@/views/Dashboard/transactionpage.vue";
import Kyc from "@/views/Dashboard/kyc.vue";
import Buyszc from "@/views/Dashboard/buyszc.vue";
import OldWallet from "@/views/Dashboard/OldWallet.vue";

import store from "@/store";

const routeGuard = (to, from, next) => {
  const { isLoggedIn } = store.getters.data;

  if (to.matched.some((record) => record.meta.requiresLogin) && isLoggedIn) {
    next();
  } else {
    next("/");
  }
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },

  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/forgotpassword",
    name: "Forgotpassword",
    component: Forgotpassword,
  },
  {
    path: "/resetpassword",
    name: "Resetpassword",
    component: Resetpassword,
  },
  {
    path: "/changepassword",
    name: "changepassword",
    component: Changepassword,
  },
  {
    path: "/verify_email",
    name: "VerifyEmail",
    component: VerifyEmail,
  },

  {
    path: "/deactivate-account",
    name: "AccountDeactivation",
    component: AccountDeactivation,
  },

  

  {
    path: "/index",
    name: "DashboardIndex",
    component: Index,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },

      {
        path: "/kyc",
        name: "kyc",
        component: Kyc,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/billpayment",
        name: "billpayment",
        component: Billpayment,
        meta: {
          requiresLogin: true,
          title:
            "Bill Payments | Modern Era payments solutions and accounting platform",
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/stablecoin",
        name: "stablecoin",
        component: Stablecoin,
        meta: {
          requiresLogin: true,
          title:
            "Stable coin | Modern Era payments solutions and accounting platform",
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/transaction",
        name: "Transaction",
        component: Transaction,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/swap",
        name: "swap",
        component: Swap,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/support",
        name: "Support",
        component: Support,
      },
      {
        path: "/buyszc",
        name: "buyszc",
        component: Buyszc,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/scan",
        name: "scan",
        component: Scan,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/withdraw",
        name: "withdraw",
        component: Withdraw,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/deposit",
        name: "deposit",
        component: Deposit,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/oldwallet",
        name: "oldwallet",
        component: OldWallet,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: {
          requiresLogin: true,
        },
        beforeEnter: routeGuard,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
