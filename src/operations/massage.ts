import { MessageFromContract, MessageType } from "../types/type.message";
import { TransactionByContract } from "../types/type.transaction";
import utils from "../utils/utils";
import { BaseOperation, Swap, Transfer } from ".";

class Message {
  public tc: TransactionByContract;
  public readonly valiedOperations: string[];

  constructor(tc: TransactionByContract) {
    this.tc = tc;
    this.valiedOperations = ["Swap", "Transfer"];
  }

  async getMessage(): Promise<MessageType> {
    const meta: MessageFromContract = await this._readContract();
    const message: MessageType = {
      hash: this.tc.tx.hash,
      explorer: `https://explorer.callisto.network/tx/${this.tc.tx.hash}`,
      type: this._getType(),
      contractCall: this._getContractCall(),
      singature: this.tc.signature,
      input: this._getInput(),
      from: this.tc.tx.from,
      to: meta.to,
      decimals: meta.decimals,
      symbol: meta.symbol,
      value: meta.value,
      tokenCount: meta.tokenCount,
      gasPriceGwei: this.tc.tx.gasPrice / Math.pow(10, 9),
      gas: this.tc.tx.gas,
      constractToken: meta.constractToken,
    };
    return message;
  }

  _getType(): string {
    return !this.tc.functionCall?.name
      ? "Transfer"
      : utils.capitalizeFirstLetter(
          utils.upperCaseArray(this.tc.functionCall.name)
        );
  }

  _getContractCall(): string | undefined {
    return !this.tc.abi ? undefined : this.tc.tx.to;
  }

  _getInput(): string | undefined {
    return !this.tc.abi ? undefined : this.tc.tx.input;
  }

  _getTo(): string | undefined {
    return !this.tc.abi ? this.tc.tx.to : undefined;
  }

  async _readContract(): Promise<MessageFromContract> {
    const _type: string = this._getType();
    let data = new BaseOperation(this.tc);

    if (this.valiedOperations.includes(_type)) {
      if (_type === "Transfer" && this.tc.abi && this.tc.functionInput) {
        console.info("Transfer");
        data = new Transfer(this.tc);
      } else if (_type === "Swap" && this.tc.abi) {
        console.info("Swap");
        data = new Swap(this.tc);
      }
    }
    return await data.readContract();
  }
}

export default Message;
