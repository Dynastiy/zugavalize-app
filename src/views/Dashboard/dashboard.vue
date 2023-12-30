<!-- eslint-disable -->
<template>
  <div>
    <Main />
  </div>
</template>
<!-- eslint-disable -->
<script>
import Main from "../../components/MainTab.vue";

export default {
  name: "Dashboard",
  components: { Main },

  watch: {
    // checkActivity() {
    //   if (this.checkActivity) {
    //     this.logout();
    //     this.$swal("Timeout, Your session has expired.");
    //   }
    // },
  },

  computed: {
    checkActivity() {
      return this.$store.state.idleVue.isIdle;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      localStorage.clear();
    },
  
  },
};
</script>

<style></style>
