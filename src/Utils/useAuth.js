/* eslint-disable  */
import axios from "@/Utils/axios.config.js";
import axiosInstance from "axios";
import { getUsers } from "@/Utils/getUser.js";

//error Logger Function
const errorLogger = (error, dis) => {
  console.log(error);
  error.map((err) => {
    for (const [_, value] of Object.entries(err)) {
      dis.$toast.error(value[0]);
    }
  });
};
export const useRegister = async (
  credentials,
  store,
  router,
  dis,
  handleLoading
) => {
  handleLoading(true);
  await axios
    .post("/users/", credentials, {
      headers: {
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJpYXQiOjE3MDM5NDM1OTcsImV4cCI6MTcxOTcyMzU5NywidXNlciI6eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbl96dWdhdmFsaXplIiwicm9sZXMiOlsiYWRtaW5pc3RyYXRvciJdfX0.cKuKFyRIWuctLg8tCfQkAIK_KVzT0eHWW0hZLnG5W7k",
      },
    })
    .then((response) => {
      handleLoading(false);
      dis.$toast.success("Registration Successful");
      axios
        .get(
          `/verify-email-address/?email_address=${credentials.user_email}&fire_email=true`
        )
        .then((response) => {
          dis.$router.push(
            `/verify_email?verification_email=${credentials.user_email}`
          );
        })
        .catch((error) => {
          errorLogger(dis, error.response.data.error);
        });
    })
    .catch((error) => {
      handleLoading(false);
      errorLogger(error.response.data.error, dis);
    });
};

export const getAddress = async (user_id) => {
 await  axiosInstance
    .get(
      `https://middleware.zugavalize.io/generate-address/${user_id}`
    )
    .then((res) => {
      console.log(res);
      const address = res.data.data.address || "";
      axiosInstance.get(
        `https://coinrimp-worker.zugavalize.io/watch/${address}`
      );
    });
}
export const useLogin = async (
  credentials,
  store,
  router,
  dis,
  handleLoading
) => {
  handleLoading(true);
  await axios
    .post("/users/login/", credentials, {
      headers: {
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJpYXQiOjE2NjMzNjM3MjksImV4cCI6MTY3OTE0MzcyOSwidXNlciI6eyJpZCI6MywidXNlcm5hbWUiOiJIb3JwZXloZXJtaSIsInJvbGVzIjpbImFkbWluaXN0cmF0b3IiXX19.fEVITFV7G8jm1rTMJT5rduH8S_7oETWslbQeLdSkCDU",
      },
    })
    .then((response) => {
      console.log(response);
      store.dispatch("setUser", response.data.data);
      const { user_id } = response.data.data;
      const { access_token } = response.data.data;
      getAddress(user_id)
      getUsers(user_id, access_token, store, router, dis, handleLoading);
    })
    .catch((error) => {
      handleLoading(false);
      dis.$toast.error(error.response.data.error[0]);
      console.log(error);
    });
};
