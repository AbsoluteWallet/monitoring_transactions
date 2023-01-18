import App from "./types/type.app";
import Web3Manager from "./utils/manager";
import RedisCache from "./utils/redis";

const app: App = {
  redis: new RedisCache(),
  web3: new Web3Manager().web3,
};

export default app;
