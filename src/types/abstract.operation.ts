import { TransactionLog, TransactionReceipt } from "../types/type.transaction";
// import utils from "../utils/utils";

abstract class OpeartionAbstract {
  public name: string;
  public event: TransactionLog;
  public block: any;
  public tx!: Required<TransactionReceipt>;
  public data: object = new Object();

  constructor(
    tx: TransactionReceipt,
    event: TransactionLog,
    name: string,
    block: any
  ) {
    this.tx = tx;
    this.name = name;
    this.block = block;
    this.event = event;
  }

  // abstract read(): Promise<void>;
}

export default OpeartionAbstract;
