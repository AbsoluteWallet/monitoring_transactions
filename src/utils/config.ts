import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

const basePath = path.resolve(process.cwd(), "./src");

const config = {
  coin: "CLO",
  rpcNode: "https://rpc.callisto.network/",
  basePath: basePath,
  baseToken: '0xf5ad6f6edec824c7fd54a66d241a227f6503ad3a',
  explorer:
    "https://explorer.callisto.network/api?module=contract&action=getabi&address={constract}",
  decimals: 18,
  redisUrl: `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`,
  checkUser: [
    {
      name: "Tio",
      address: "0xBCf017563fA9709cCd741249175fA307AF212085",
      email: "rota199804@gmail.com",
    },
    {
      name: "Kostya",
      address: "0x873988371506903983dA811188b423588d3C6620",
      email: "rota199804@gmail.com",
    },
    {
      name: "Kostya TG",
      address: "0xe01d28dc936173A9A70e764E28CF2524a3fF3952",
      email: "rota199804@gmail.com",
    },
    {
      name: "Oleg TG",
      address: "0x923a55447956e32a565d6c0b495e9cd33c4cf1f9",
      email: "gorbatiuk.ol@gmail.com",
    },
    {
      name: "Oleg test iOS",
      address: "0x00Ee78Ac304c1e0b77D7b74D58cf294aCe26cC64",
      email: "gorbatiuk.ol@gmail.com",
    },
  ],
};

export default config;
