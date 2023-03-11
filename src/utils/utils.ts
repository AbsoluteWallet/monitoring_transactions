import axios from "axios";

class UtilsWork {
  public TOKEN_ABI_ERC20: Array<object>;
  public TRANSFER_EVENT_ABI: Array<object>;
  public network: any;

  constructor() {
    this.TOKEN_ABI_ERC20 = [
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
    this.TRANSFER_EVENT_ABI = [
      {
        type: "address",
        name: "from",
        indexed: true,
      },
      {
        type: "address",
        name: "to",
        indexed: true,
      },
      {
        type: "uint256",
        name: "value",
        indexed: false,
      },
    ];
    this.network = undefined;
    (async () => {
      await this.getNetwork();
    })();
  }

  private async getNetwork() {
    const response = await axios.get(
      "https://api-data.absolutewallet.com/api/v1/networks/list?id=clo&page=1&size=300"
    );
    this.network = response.data.data[0];
    return response.data.data[0];
  }
}

const utils = new UtilsWork();
export default utils;
