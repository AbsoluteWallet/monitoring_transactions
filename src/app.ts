import App from "./types/type.app";
import ClienPG from "./utils/db";
import Web3Manager from "./utils/manager";
import ClientRMQ from "./utils/rmq";

const app: App = {
  db: new ClienPG(),
  rmq: new ClientRMQ(),
  web3: new Web3Manager().web3,
};

export default app;
