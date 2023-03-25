import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

const basePath = path.resolve(process.cwd(), "./src");

const config = {
  rpcNode: process.env.RPC_NODE || "https://rpc.callisto.network/",
  basePath: basePath,
  pushUrl: process.env.PUSH_URL || "http://0.0.0.0:5009/push/send-push",
  baseResult: {
    symbol: process.env.BASE_SYMBOL || "CLO",
    decimals: process.env.BASE_DECIMALS || 18,
  },
};

export default config;
