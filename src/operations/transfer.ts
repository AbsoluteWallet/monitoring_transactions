import app from "../app";
import { TransactionByContract } from "../types/type.transaction";
import OpeartionAbstract from "./base";

class Transfer extends OpeartionAbstract {
  constructor(tc: TransactionByContract) {
    super(tc);
  }

  async readContract() {
    const contractInstance = new app.web3.eth.Contract(
      this.tc.abi,
      this.tc.tx.to
    );
    const decimals: number = await contractInstance.methods.decimals().call();
    this.data.decimals = decimals;
    this.data.constractToken = this.tc.tx.to;
    this.data.symbol = await contractInstance.methods.symbol().call();
    this.data.to = this.tc.functionInput.recipient;
    this.data.value = Number(this.tc.functionInput.amount);
    this.data.tokenCount =
      Number(this.tc.functionInput.amount) / Math.pow(10, decimals);
    return this.data;
  }
}

export default Transfer;
