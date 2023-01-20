import app from "./app";
import DetectTranascion from "./transaction";
import config from "./utils/config";
import utils from "./utils/utils";

class TransactionChecker {
  async checkBlock() {
    const block = await app.web3.eth.getBlock("latest");
    // let block = await app.web3.eth.getBlock(11552145); //swap 0x295436b0a6271661cd004c514b45a4d4f0ffadd90bdcd4a04b930d24cdc2e7b1
    // let block = await app.web3.eth.getBlock(11000605); //transfer
    //0xdbaa6f1144020b08ce21f74cedbd580dd5c212ceb8be1c4fe470286836d33e0d
    // let block = await app.web3.eth.getBlock(11420141); //base transfer
    // 0x27b0ad6fb78cb0b94be35db76321a8e60c5c24a5bdc8b26d98bf107d93eeaac1
    // const block = await app.web3.eth.getBlock(11555406);
    if (
      block != null &&
      block.transactions != null &&
      block.number !== preLastBlockNumber
    ) {
      preLastBlockNumber = block.number;
      console.log(block.number);
      for (const txHash of block.transactions) {
        const tx = await app.web3.eth.getTransaction(txHash);
        const tr = new DetectTranascion();
        const message = await tr.tecectCall(tx);

        try {
          config.checkUser.forEach((e) => {
            if (message?.to === e.address && message.value > 0) {
              utils.sendMessage(message, "rota199804@gmail.com");
              utils.sendMessage(message, e.email);
            }
          });
        } catch (err) {
          console.log(err, message?.explorer);
        }
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
