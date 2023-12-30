<!-- eslint-disable -->
<template>
  <div>
    <Login />
    <!-- <button @click="Register">Register</button>
    <div></div>
    <button @click="Signin">Signin</button>
    <label for="">Register</label><br />
    <input type="text" v-model="register" /><br />
    <label for="">login</label><br />
    <input type="text" v-model="login" /><br /> -->
  </div>
</template>
<!-- eslint-disable -->

<script>
import Login from "../components/Login.vue";
// import { uuid } from "uuidv4";
export default {
  name: "login",
  components: {
    Login,
  },

  data() {
    return {
      apiKey: "Middey22:public:e215e51825264ed8a8c5e0bd572d29c5",
      backendUrl: "https://fingerprint-middey.herokuapp.com",
      register: "",
      login: "",
    };
  },
  mounted() {
  },
  methods: {
    // Passwordless integration

    async Register() {
      const apiKey = this.apiKey;
      const p = new Passwordless.Client({ apiKey });
      const myToken = await fetch(
        this.backendUrl + "/create-token?alias=" + this.register
      ).then((r) => r.text());
      await p.register(myToken);
      console.log("Register succeded");
    },
    async Signin() {
      const apiKey = this.apiKey;
      const p = new Passwordless.Client({ apiKey });
      const token = await p.signinWithAlias(this.login);
      const user = await fetch(
        this.backendUrl + "/verify-signin?token=" + token
      ).then((r) => r.json());
      console.log("User details", user);
      return user;
    },

    // Call Register('unique@email') to register with faceid/touchid/authenticator
    // Call Signin('unique@email') to signin using faceid/touchid/authenticator
  },
};
</script>
<!-- eslint-disable -->

<style></style>
