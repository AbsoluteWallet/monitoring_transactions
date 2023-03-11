import Transfer from "./operations/transfer";
import { TransactionReceipt } from "./types/type.transaction";

class DetectTranascion {
  public tx: TransactionReceipt;
  public block: any;

  constructor(tx: TransactionReceipt, block: any) {
    this.tx = tx;
    this.block = block;
  }

  async detectCall(): Promise<any> {
    if (this.tx.logs.length) {
      this.tx.logs.forEach((event: any) => {
        if (
          event.topics[0] ==
          "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
        ) {
          const op = new Transfer(this.tx, event, this.block);
          op.read().then((result) => {
            console.log(result, "0000");
          });
        }
      });
    } else {
      console.log("=====");
    }
  }
}

export default DetectTranascion;
