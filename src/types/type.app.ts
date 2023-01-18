import RedisCache from "../utils/redis";

export default interface App {
  redis: RedisCache;
  web3: any;
}