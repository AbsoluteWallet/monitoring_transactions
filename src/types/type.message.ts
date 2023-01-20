import app from "../app";
import config from "../utils/config";
import utils from "../utils/utils";
import { TransactionByContract } from "./type.transaction";

interface MessageFromContract {
  decimals: number;
  symbol: string;
  to: string;
  value: number;
  constractToken: string;
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


export type { MessageType, MessageFromContract };