import app from "../app";
import { TransactionLog, TransactionReceipt } from "../types/type.transaction";
import utils from "../utils/utils";
import OpeartionAbstract from "./base";

class Transfer extends OpeartionAbstract {
  constructor(tx: TransactionReceipt, event: TransactionLog, block: any) {
    super(tx, event, "Transfer", block);
  }

  async read() {
    const transaction = app.web3.eth.abi.decodeLog(
      utils.TRANSFER_EVENT_ABI,
      this.event.data,
      [this.event.topics[1], this.event.topics[2], this.event.topics[3]]
    );
    const contract = new app.web3.eth.Contract(
      utils.TOKEN_ABI_ERC20,
      this.event.address
    );
    this.collectData(contract).then((data: any) => {
      const unit = Object.keys(app.web3.utils.unitMap).find(
        (key) =>
          app.web3.utils.unitMap[key] ===
          app.web3.utils
            .toBN(10)
            .pow(app.web3.utils.toBN(data.decimals))
            .toString()
      );
      this.data["datail"] = new Object({
        symdol: data.symbol,
        decimals: Number(data.decimals),
        value: Number(app.web3.utils.fromWei(transaction.value, unit)),
        from: transaction.from,
        to: transaction.to,
      });
      console.log(this.data);
    });
  }
}

export default Transfer;
