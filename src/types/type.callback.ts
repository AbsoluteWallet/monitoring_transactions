interface Network {
  id: string;
  name: string;
  caip_two: string;
  logo: string;
}
interface Detail {
  symdol: string;
  decimals: number;
  value: number;
  from: number;
  to: number;
}
interface TransactionDetail {
  type: string;
  tx: string;
  status?: boolean;
  block: number;
  explorer_tx: string;
  topics: Array<string> | undefined;
  data: string | undefined;
}

interface CallbackBody {
  network: Network;
  transaction: TransactionDetail;
}

export type { CallbackBody, Network, Detail };
