import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,
  async connect(uri: string) {
    this.client = new MongoClient(uri);
    await this.client.connect();
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(dbName: string): Collection {
    return this.client.db().collection(dbName);
  },
};
