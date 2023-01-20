import { AbiItem } from "web3-utils";

interface Transaction {
  blockHash: string;
  blockNumber: number;
  from: string;
  gas: number;
  gasPrice: number;
  hash: string;
  input: string;
  nonce: number;
  to: string;
  transactionIndex: number;
  value: string;
  v: string;
  r: string;
  s: string;
}

interface TransactionByContract {
  tx: Transaction;
  abi?: Array<AbiItem>;
  functionCall?: AbiItem;
  signature?: string;
  functionInput?: any;
}

export type { Transaction, TransactionByContract };
