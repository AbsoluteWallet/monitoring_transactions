import app from "./app";
import DetectTranascion from "./transaction";

class TransactionChecker {
  async checkBlock() {
    const block = await app.web3.eth.getBlock("latest");
    // let block = await app.web3.eth.getBlock(11552145); //swap 0x295436b0a6271661cd004c514b45a4d4f0ffadd90bdcd4a04b930d24cdc2e7b1
    // let block = await app.web3.eth.getBlock(11000605); //transfer
    //0xdbaa6f1144020b08ce21f74cedbd580dd5c212ceb8be1c4fe470286836d33e0d
    // let block = await app.web3.eth.getBlock(11420141); //base transfer
    // 0x27b0ad6fb78cb0b94be35db76321a8e60c5c24a5bdc8b26d98bf107d93eeaac1
    if (
      block != null &&
      block.transactions != null &&
      block.number !== preLastBlockNumber
    ) {
      preLastBlockNumber = block.number;
      for (const txHash of block.transactions) {
        const tx = await app.web3.eth.getTransactionReceipt(
          // txHash
          // "0x0a6b190c25cbad550e596858caece8c81e557d245873d282f35d183c2edee84d"
          // // "0x1e61bcdbe4a3f93c0d039acaccedc4f4a5ebebc12930648190578fce97cacb35"
          // // "0x82dc80b686a5d8dd65e723ed7144fba7e3359aada2956bb6c4a39938fcee5443"
          // "0xc507a3d2440b39d87f332bcb4fbc4e0f2355c963f6adf1ca2b3c48e90f63ee72"
          "0x1799ab5ac0197925a69f1febc983626aef0f645a60fa96d1fec9f9697d8a74be"  // BTT to WCLO 
        );
        const tr = new DetectTranascion(tx, block);
        await tr.detectCall();
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
