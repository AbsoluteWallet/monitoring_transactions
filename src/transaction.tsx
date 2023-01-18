import { AbiItem } from "web3-utils";

import app from "./app";
import Message, { MessageType } from "./types/type.message";
import { Transaction, TransactionByContract } from "./types/type.transaction";
import utils from "./utils/utils";

class DetectTranascion {
  async tecectCall(tx: Transaction): Promise<MessageType | undefined> {
    const tc: TransactionByContract = {
      tx: tx,
    };
    if (tx.input !== "0x") {
      tc.abi = await utils.getAbiData(tx.to);
      tc.signature = utils.getSignature(tx.input);
      tc.functionCall = await this.getInput(tc.abi, tc.signature);
      if (!tc.functionCall || !tc.abi) return undefined;
      tc.functionInput = app.web3.eth.abi.decodeParameters(
        tc.functionCall?.inputs,
        tx.input.slice(10)
      );
      if (tc.functionInput) {
        for (const [key, value] of Object.entries(tc.functionInput)) {
          if (!utils.isNumber(key) && app.web3.utils.isAddress(value)) {
            const message = new Message(tc);
            return await message.getMessage();
          }
        }
      }
    } else {
      const message = new Message(tc);
      return await message.getMessage();
    }
  }

  async getInput(abi: AbiItem[], signature: string) {
    let item: AbiItem | undefined = await app.redis.get(signature);
    if (item) return item;
    try {
      abi.forEach((e: AbiItem) => {
        if (e.inputs) {
          const key = app.web3.eth.abi.encodeFunctionSignature(e);
          if (key == signature) {
            app.redis.add(key, e);
            item = e;
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
    return item;
  }
}

export default DetectTranascion;
