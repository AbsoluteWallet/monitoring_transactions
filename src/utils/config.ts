import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

const basePath = path.resolve(process.cwd(), "./src");

const config = {
  coin: "CLO",
  rpcNode: "https://rpc.callisto.network/",
  basePath: basePath,
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
  ],
};

export default config;
