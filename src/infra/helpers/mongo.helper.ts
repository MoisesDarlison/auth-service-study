import { Collection, MongoClient, ObjectId } from "mongodb";

export const MongoHelper = {
  client: null as unknown as MongoClient,
  hasConnected: false,
  async connect(uri: string) {
    this.client = new MongoClient(uri);
    await this.client.connect();
  },
  async disconnect(): Promise<void> {
    await this.client.close();
  },

  async getCollection(dbName: string): Promise<Collection> {
    /**
     * I inserted a tryCatch at this point as the isConnected attribute is no longer available for this version of mongoDB.
     * And from what I've read, the same is making this reconnection attempt internally.
     * but I prefer to maintain a treatment at this point as well.
     **/

    try {
      await this.client.db().stats();
      return this.client.db("AuthService").collection(dbName);
    } catch (error) {
      await this.client.connect();
      return this.client.db("AuthService").collection(dbName);
    }
  },

  map(collection: any, id: ObjectId): any {
    const { _id, ...collectionWithout_Id } = collection;
    return Object.assign({}, collectionWithout_Id, { id });
  },
};
