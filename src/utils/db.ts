import { Pool } from "pg";

import config from "./config";

class ClientPG {
  public pool: Pool;

  constructor() {
    this.pool = new Pool(config.db);
  }

  async name(contract: string) {
    console.log("test");
  }
}

export default ClientPG;
