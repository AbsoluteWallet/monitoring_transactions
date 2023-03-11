// import app from "../app";
// import { TransactionByContract } from "../types/type.transaction";
// import utils from "../utils/utils";
// import OpeartionAbstract from "./base";

// class Swap extends OpeartionAbstract {
//   constructor(tc: TransactionByContract) {
//     super(tc);
//   }

//   async readContract() {
//     const abi = await utils.getAbiData(this.tc.functionInput.path.slice(-1)[0]);
//     const contractInstance = new app.web3.eth.Contract(
//       abi,
//       this.tc.functionInput.path.slice(-1)[0]
//     );
//     const decimals: number = await contractInstance.methods.decimals().call();
//     this.data.decimals = Number(decimals);
//     this.data.constractToken = this.tc.functionInput.path.slice(-1)[0];
//     this.data.symbol = await contractInstance.methods.symbol().call();
//     this.data.to = this.tc.functionInput.to;
//     this.data.value = Number(this.tc.functionInput.amountOutMin);
//     this.data.tokenCount = this.data.value / Math.pow(10, this.data.decimals);
//     return this.data;
//   }
// }

// export default Swap;
