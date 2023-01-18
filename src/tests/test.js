const axios = require("axios");

const message = {
  hash: "0xd0709c0cca62dcb48aa91b8058896dca65a0b2e9baa4182001ecca5c0687f721",
  explorer:
    "https://explorer.callisto.network/tx/0xd0709c0cca62dcb48aa91b8058896dca65a0b2e9baa4182001ecca5c0687f721",
  type: "Transfer",
  contractCall: "0x4309b1FfF68E4C46abc9c92FB813cAFD1fC05A70",
  singature: "0xa9059cbb",
  input:
    "0xa9059cbb000000000000000000000000a99e8864a727717f5c4c82031f99d360eb5777380000000000000000000000000000000000000000000000000000000000000000",
  from: "0xA16FEa7Aba220f1ac82d6dd36ddeb1d4920B1140",
  to: "0xa99E8864A727717F5C4c82031F99D360eb577738",
  decimals: "18",
  symbol: "SOY-LP",
  value: 0,
  tokenCount: 0,
  gasPriceGwei: 10,
  gas: 264495,
};

async function sendMessage(message, email) {
  let later = "";
  for (const [key, value] of Object.entries(message)) {
    later += `${key}: ------> ${value}</br>`;
  }
  let response = axios.post("http://34.206.40.30:5005/send/email-message", {
    to_emails: [email],
    body: later,
    subject: `Get Operaions ${message.to}`,
  });
  return response;
}
sendMessage(message, "rota199804@gmail.com").then((response) => {
  console.log(response.data);
});
