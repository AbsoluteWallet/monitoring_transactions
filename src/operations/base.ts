import OpeartionAbstract from "../types/abstract.operation";
import { TransactionLog, TransactionReceipt } from "../types/type.transaction";
import utils from "../utils/utils";

class BaseOpeartion extends OpeartionAbstract {
  constructor(
    tx: TransactionReceipt,
    event: TransactionLog,
    name: string,
    block: any
  ) {
    super(tx, event, name, block);
    this.data = {
      network: {
        id: utils.network.id,
        name: utils.network.name,
        caip_two: utils.network.caip_two,
        logo: utils.network.logo,
      },
      transaction: {
        type: this.name,
        tx: this.event.transactionHash,
        status: this.tx.status,
        block: this.block.number,
        explorer_tx: utils.network.explorer_tx.replace(
          "{tx}",
          this.event.transactionHash
        ),
        topics: this.event.topics,
        data: this.event.data,
      },
    };
  }

  async collectData(contract: any): Promise<object> {
    let decimals: string, symbol: string;
    try {
      [decimals, symbol] = await Promise.all([
        contract.methods.decimals().call(),
        contract.methods.symbol().call(),
      ]);
    } catch (e) {
      console.log(e);
    }
    return { decimals, symbol };
  }
}

export default BaseOpeartion;
