import { MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string) {
    this.client = new MongoClient(uri);
    await this.client.connect();
    // const db = client.db(dbName);
    // const collection = db.collection("documents");
  },
  async disconnect(): Promise<void> {
    await this.client.close();
    // await this.client.connect();
    // const db = client.db(dbName);
    // const collection = db.collection("documents");
  },
};
