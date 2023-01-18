import { type } from "os";
import app from "../app";
import config from "../utils/config";
import utils from "../utils/utils";
import { TransactionByContract } from "./type.transaction";

interface MessageFromContract {
  decimals: number;
  symbol: string;
  to: string;
  value: number;
  tokenCount: number;
}

interface MessageType extends MessageFromContract {
  hash: string;
  explorer: string;
  type: string;
  contractCall?: string;
  singature?: string;
  input?: string;
  from?: string;
  gasPriceGwei?: number;
  gas?: number;
}

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
    const data: MessageFromContract = {
      decimals: config.decimals,
      symbol: config.coin,
      to: this.tc.tx.to,
      value: Number(this.tc.tx.value),
      tokenCount: Number(this.tc.tx.value) / Math.pow(10, config.decimals),
    };
    if (this.valiedOperations.includes(_type)) {
      if (_type === "Transfer" && this.tc.abi && this.tc.functionInput) {
        console.info("Transfer");
        const contractInstance = new app.web3.eth.Contract(
          this.tc.abi,
          this.tc.tx.to
        );
        const decimals: number = await contractInstance.methods
          .decimals()
          .call();
        data.decimals = decimals;
        data.symbol = await contractInstance.methods.symbol().call();
        data.to = this.tc.functionInput.recipient;
        data.value = Number(this.tc.functionInput.amount);
        data.tokenCount =
          Number(this.tc.functionInput.amount) / Math.pow(10, decimals);
      } else if (_type === "Swap" && this.tc.abi) {
        console.info("Swap");
        const abi = await utils.getAbiData(
          this.tc.functionInput.path.slice(-1)[0]
        );
        const contractInstance = new app.web3.eth.Contract(
          abi,
          this.tc.functionInput.path.slice(-1)[0]
        );
        const decimals: number = await contractInstance.methods
          .decimals()
          .call();
        data.decimals = Number(decimals);
        data.symbol = await contractInstance.methods.symbol().call();
        data.to = this.tc.functionInput.to;
        data.value = Number(this.tc.functionInput.amountOutMin);
        data.tokenCount = data.value / Math.pow(10, data.decimals);
      }
    }
    return data;
  }
}

export default Message;
export type { MessageType };