import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

const basePath = path.resolve(process.cwd(), "./src");

const config = {
  rpcNode: "https://rpc.callisto.network/",
  basePath: basePath,
  uriRMQ: `${process.env.RMQ_URL_CONNECTION_STR}`,
  db: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || "5432",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  // checkUser: [
  //   {
  //     name: "Tio",
  //     address: "0xBCf017563fA9709cCd741249175fA307AF212085",
  //     email: "rota199804@gmail.com",
  //   },
  //   {
  //     name: "Kostya",
  //     address: "0x873988371506903983dA811188b423588d3C6620",
  //     email: "rota199804@gmail.com",
  //   },
  //   {
  //     name: "Kostya TG",
  //     address: "0xe01d28dc936173A9A70e764E28CF2524a3fF3952",
  //     email: "rota199804@gmail.com",
  //   },
  //   {
  //     name: "Oleg TG",
  //     address: "0x923a55447956e32a565d6c0b495e9cd33c4cf1f9",
  //     email: "gorbatiuk.ol@gmail.com",
  //   },
  //   {
  //     name: "Oleg test iOS",
  //     address: "0x00Ee78Ac304c1e0b77D7b74D58cf294aCe26cC64",
  //     email: "gorbatiuk.ol@gmail.com",
  //   },
  // ],
};

export default config;
