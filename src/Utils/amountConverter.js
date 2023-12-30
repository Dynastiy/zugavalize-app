/* eslint-disable */
import axios from "axios";

let result;
const getEquivalent = async (
  loader,
  amountToSwap,
  fromCurrency,
  toCurrency,
  thisInstance
) => {
  loader = true;
  await axios
    .post("https://middleware.zugavalize.io/converter", {
      amount: amountToSwap,
      wallet_from: fromCurrency,
      wallet_to: toCurrency,
    })
    .then((response) => {
      loader = false;
      console.log(response);
      result = response.data.data.conversion;
    })
    .catch((err) => {
      console.log(err);
      result = 0;
      thisInstance.$toast.error(err.response.data.message);
      loader = false;
    });
  return result;
};

export default getEquivalent;
