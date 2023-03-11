import ClientPG from "../utils/db";
import ClientRMQ from "../utils/rmq";

export default interface App {
  db: ClientPG;
  rmq: ClientRMQ;
  web3: any;
}
