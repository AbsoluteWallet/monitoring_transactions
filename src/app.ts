import App from "./types/type.app";
import Web3Manager from "./utils/manager";

const app: App = {
  web3: new Web3Manager().web3,
};

export default app;
