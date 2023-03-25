import axios from "axios";

class UtilsWork {
  public network: any;

  constructor() {
    this.network = undefined;
    (async () => {
      await this.getNetwork();
    })();
  }

  private async getNetwork() {
    const response = await axios.get("https://api-data.absolutewallet.com/api/v1/networks/list?id=clo&page=1&size=300");
    this.network = response.data.data[0];
    return response.data.data[0];
  }
}

const utils = new UtilsWork();
export default utils;
