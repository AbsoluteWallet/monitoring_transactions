import OpeartionAbstract from "../types/abstract.operation";
import { TransactionByContract } from "../types/type.transaction";

class BaseOpeartion extends OpeartionAbstract {
  constructor(tc: TransactionByContract) {
    super(tc);
  }
  async readContract() {
    return this.data;
  }
}

export default BaseOpeartion;
