/* eslint-disable  */

// First we need to import axios.js
import axios from "axios";

// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: "https://backend.zugavalize.io/wp-json/rimplenet/v1/",
});

// Where you would set stuff like your 'Authorization' header, etc ...


// Also add/ configure interceptors && all the other cool stuff

export default instance;
