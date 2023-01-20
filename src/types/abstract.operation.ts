import { MessageFromContract } from "../types/type.message";
import { TransactionByContract } from "../types/type.transaction";
import config from "../utils/config";

abstract class OpeartionAbstract {
  public data: MessageFromContract;
  public tc!: Required<TransactionByContract>;

  constructor(tc: TransactionByContract) {
    this.data = {
      decimals: config.decimals,
      symbol: config.coin,
      to: tc.tx.to,
      constractToken: config.baseToken,
      value: Number(tc.tx.value),
      tokenCount: Number(tc.tx.value) / Math.pow(10, config.decimals),
    };
  }

  abstract readContract(): Promise<MessageFromContract>;
}

export default OpeartionAbstract;
