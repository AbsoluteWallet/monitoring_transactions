import { createClient, RedisClientType } from "redis";
import { AbiItem } from "web3-utils";

import config from "./config";

class RedisCache {
  private cache: RedisClientType;
  private ttl: number;

  constructor() {
    this.ttl = 10000;
    this.cache = createClient({
      url: config.redisUrl,
    });
    this.cache.connect();
  }

  async get(key: string): Promise<AbiItem | undefined> {
    const value = await this.cache.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  async add(key: string, value: AbiItem): Promise<AbiItem> {
    this.cache.set(
      key,
      JSON.stringify(value)
      // "EX",
      // this.ttl,
    );
    return value;
  }

  del(key: string) {
    this.cache.del(key);
  }

  flush() {
    this.cache.flushAll();
  }
}

export default RedisCache;
