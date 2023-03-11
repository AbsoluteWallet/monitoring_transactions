import client, { Channel, Connection } from "amqplib";

import config from "./config";

class ClientRMQ {
  private conn: Connection;
  private uri: string;
  private channel: Channel;
  private queue: string;

  constructor() {
    this.conn;
    this.uri = config.uriRMQ;
    this.queue = "CLO";
  }

  async setupConnection() {
    this.conn = await client.connect(this.uri);
    this.channel = await this.conn.createChannel();
    await this.channel.assertQueue(this.queue, { durable: false });
  }
}

export default ClientRMQ;
