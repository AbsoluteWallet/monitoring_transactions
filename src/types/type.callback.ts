import { EventsEnum } from "./type.transaction";

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

type ResultDetail = {
  symbol: string;
  decimals: number;
  value: number;
  from: string;
  to: string;
};

export type Result = {
  status: boolean;
  tx: string;
  explorer: string;
  block: number;
  timestamp: number;
  network: {
    id: string;
    logo: string;
    name: string;
  };
  event: EventsEnum;
  detail?: ResultDetail;
};

export type { CallbackBody, Network, Detail };
