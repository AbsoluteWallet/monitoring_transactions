export interface Transaction {
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

export interface TransactionReceipt {
  blockHash: string;
  blockNumber: number;
  contractAddress: string | undefined;
  cumulativeGasUsed: number;
  from: string;
  gasUsed: number;
  logs: Array<TransactionLog>;
  logsBloom: string;
  status: true;
  to: string;
  transactionHash: string;
  transactionIndex: number;
}

export interface TransactionLog {
  address: string;
  topics: Array<any>;
  data: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
  id: string;
}

export interface EventInterface {
  topic: string;
  abi: Array<object>;
}

export enum EventsEnum {
  DEPOSIT = "DEPOSIT",
  WITHDROW = "WITHDROW",
  TRANSFER = "TRANSFER",
  TRANSFER_NATIVE = "TRANSFER_NATIVE",
}

interface Detail {
  symdol: string;
  decimals: number;
  value: number;
  from: number;
  to: number;
}

interface PreResult {
  status: boolean;
  tx: string;
  block: number;
  timestamp: number;
  event: EventsEnum;
}

export interface Result extends PreResult {
  detail: Detail;
}

export type Event = Record<EventsEnum, EventInterface>;
