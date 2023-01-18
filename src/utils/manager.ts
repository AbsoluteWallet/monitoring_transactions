import Web3 from "web3";

import config from "./config";

class Web3Manager {
  web3: any;
  constructor() {
    try {
      this.web3 = new Web3(config.rpcNode);
    } catch (err) {
      console.log(err);
    }
  }
}

export default Web3Manager;
