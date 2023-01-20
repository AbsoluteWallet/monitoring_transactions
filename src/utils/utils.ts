import axios from "axios";
import fs from "fs";
import { AbiItem } from "web3-utils";

import baseABI from "../../abi/base_abi_token.json";
import { MessageType } from "../types/type.message";
import config from "./config";

class UtilsWork {
  getSignature(signature: string): string {
    // Получаем первые 4 байта
    return signature.slice(0, 10);
  }

  capitalizeFirstLetter(string: string) {
    // Преобразование название swap -> Swap
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  upperCaseArray(input: string): string {
    // Преобразование название swapTransactionCall -> Swap спли строки по на строки в верхнем регистре
    const result = input.replace(/([A-Z]+)/g, ",$1").replace(/^,/, "");
    return result.split(",")[0];
  }

  getFucntionCall(name: string) {
    return this.upperCaseArray(name)[0];
  }

  isNumber(n: any): boolean {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  readText(path: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, "utf8", (err: any, result: any) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  async sendMessage(message: MessageType, email: string) {
    let later = "";
    for (const [key, value] of Object.entries(message)) {
      later += `${key}: ------> ${value}</br>`;
    }
    axios.post("http://34.206.40.30:5005/send/email-message", {
      to_emails: [email],
      body: later,
      subject: `Get Operaions ${message.to}`,
    });
  }

  async getAbiData(contract: string): Promise<AbiItem[]> {
    const abiPath = `./abi/${contract}.json`;
    return await this.readText(abiPath)
      .then(async (abi: any) => {
        return JSON.parse(abi);
      })
      .catch(async () => {
        // Делаем запрос на получение ABI в експлорер
        const response = await axios.get(
          config.explorer.replace("{constract}", contract)
        );
        // Сохраням файл ABI
        if (response.data.result !== null) {
          fs.writeFileSync(abiPath, response.data.result);
          return JSON.parse(response.data.result);
        } else {
          return baseABI;
        }
      });
  }
}

const utils = new UtilsWork();
export default utils;
