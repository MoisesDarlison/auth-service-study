import { Collection, MongoClient, ObjectId } from "mongodb";

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

  map(collection: any, id: ObjectId): any {
    return Object.assign({}, collection, { id });
  },
};
