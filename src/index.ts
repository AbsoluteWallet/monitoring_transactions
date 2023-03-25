import axios from "axios";
import app from "./app";
import { TransactionReceipt, Event, EventsEnum, TransactionLog } from "./types/type.transaction";
import config from "./utils/config";
import utils from "./utils/utils";

const TOKEN_ABI_ERC20 = [
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const TRANSFER_EVENT_ABI = [
  { type: "address", name: "from", indexed: true },
  { type: "address", name: "to", indexed: true },
  { type: "uint256", name: "value", indexed: false },
];

const DEPOSIT_EVENT_ABI = [
  { indexed: true, name: "to", type: "address" },
  { indexed: false, name: "value", type: "uint256" },
];

const WITHDROW_EVENT_ABI = [
  { indexed: true, name: "from", type: "address" },
  { indexed: false, name: "value", type: "uint256" },
];

class TransactionChecker {
  async collectData(contract: any): Promise<object> {
    let decimals: string, symbol: string;
    try {
      [decimals, symbol] = await Promise.all([contract.methods.decimals().call(), contract.methods.symbol().call()]);
    } catch (e) {
      console.log(e);
    }
    return { decimals, symbol };
  }

  getEvent(topic: string): any {
    const events: Event = {
      [EventsEnum.DEPOSIT]: {
        topic: "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        abi: DEPOSIT_EVENT_ABI,
      },
      [EventsEnum.WITHDROW]: {
        topic: "0x7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65",
        abi: WITHDROW_EVENT_ABI,
      },
      [EventsEnum.TRANSFER]: {
        topic: "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        abi: TRANSFER_EVENT_ABI,
      },
      [EventsEnum.TRANSFER_NATIVE]: { topic: "", abi: [{}] },
    };
    for (const [key, value] of Object.entries(events)) {
      if (value.topic === topic) {
        return [key, value];
      }
    }
  }

  async checkBlock() {
    const block = await app.web3.eth.getBlock("latest");
    if (block != null && block.transactions != null && block.number !== preLastBlockNumber) {
      preLastBlockNumber = block.number;
      for (let txHash of block.transactions) {
        app.web3.eth.getTransactionReceipt(txHash).then((tx: TransactionReceipt) => {
          const result = {
            status: tx.status,
            tx: tx.blockHash,
            explore: utils.network.explorer_tx.replace("{tx}", txHash),
            block: block.number,
            timestamp: block.timestamp,
            network: {
              id: utils.network.id,
              logo: utils.network.logo,
              name: utils.network.name,
            },
            event: EventsEnum.TRANSFER_NATIVE,
          };
          if (tx.logs.length) {
            tx.logs.forEach((log: TransactionLog) => {
              const event = this.getEvent(log.topics[0]);
              if (event) {
                log.topics.shift();
                const transaction = app.web3.eth.abi.decodeLog(event[1].abi, log.data, log.topics);
                const contract = new app.web3.eth.Contract(TOKEN_ABI_ERC20, log.address);
                this.collectData(contract).then((data: any) => {
                  const unit = Object.keys(app.web3.utils.unitMap).find(
                    (key) =>
                      app.web3.utils.unitMap[key] ===
                      app.web3.utils.toBN(10).pow(app.web3.utils.toBN(data["decimals"])).toString(),
                  );
                  result.event = event[0];
                  result["detail"] = new Object({
                    symbol: data["symbol"],
                    decimals: Number(data["decimals"]),
                    value: Number(app.web3.utils.fromWei(transaction.value, unit)),
                    from: transaction.from ?? tx.from,
                    to: transaction.to ?? tx.from,
                  });
                  try {
                    axios.post(config.pushUrl, result);
                  } catch (error) {
                    console.error(error);
                  }
                });
              }
            });
          } else {
            app.web3.eth.getTransaction(txHash).then((data: any) => {
              const unit = app.web3.utils.toBN(10).pow(app.web3.utils.toBN(config.baseResult.decimals)).toString();
              result["detail"] = new Object({
                symbol: config.baseResult.symbol,
                decimals: config.baseResult.decimals,
                value: Number(data.value / unit),
                from: data.from,
                to: data.to,
              });
              try {
                axios.post(config.pushUrl, result);
              } catch (error) {
                console.error(error);
              }
            });
          }
        });
        // }
      }
    }
  }
}

let preLastBlockNumber = 0;
setInterval(function () {
  const transactionChecker = new TransactionChecker();
  try {
    transactionChecker.checkBlock();
  } catch (err) {
    transactionChecker.checkBlock();
  }
}, 2 * 1000);
