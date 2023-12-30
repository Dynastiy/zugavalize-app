<!-- eslint-disable -->
<template>
  <div>
    <div
      class="md:hidden fixed inset-x-0 bottom-0 bg-white border-t border-yellow-700"
    >
      <div class="flex justify-between items-center px-4 py-3 w-full">
        <router-link
          to="/dashboard"
          class="flex flex-col items-center space-y-2"
          :class="
            isActiveRoute('dashboard') ? 'text-yellow-600' : 'text-[#000]'
          "
        >
          <div><i class="fa-solid fa-home"></i></div>
          <div class="text-[10px]">Home</div>
        </router-link>
        <router-link
          to="/deposit"
          class="flex flex-col items-center space-y-2"
          :class="
            isActiveRoute('deposit') ? 'text-yellow-600' : 'text-[#000]'
          "
        >
          <div><i class="fa-solid fa-coins"></i></div>
          <div class="text-[10px]">Deposit</div>
        </router-link>
   
        <router-link
          to="/swap"
          class="flex flex-col items-center space-y-2"
          :class="isActiveRoute('swap') ? 'text-yellow-600' : 'text-[#000]'"
        >
          <div><i class="fa-solid fa-exchange"></i></div>
          <div class="text-[10px]">Swap</div>
        </router-link>
        <router-link
          to="/scan"
          class="flex flex-col items-center space-y-2"
          :class="
            isActiveRoute('sendcoin') ? 'text-yellow-600' : 'text-[#000]'
          "
        >
          <div><i class="fa-solid fa-qrcode"></i></div>
          <div class="text-[10px]">Scan</div>
        </router-link>
        <router-link
          to="/billpayment"
          class="flex flex-col items-center space-y-2"
          :class="isActiveRoute('billpayment') ? 'text-yellow-600' : 'text-[#000]'"
        >
          <div><i class="fa-solid fa-file"></i></div>
          <div class="text-[10px]">Bill Payment</div>
        </router-link>
       
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable  -->

<script>
/* eslint-disable */
export default {
  name: "mobilenav",
  props: ["isActiveRoute"],
};
</script>

<style></style>
