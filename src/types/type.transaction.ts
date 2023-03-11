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

interface TransactionReceipt {
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

interface TransactionLog {
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

export type { Transaction, TransactionReceipt, TransactionLog };
