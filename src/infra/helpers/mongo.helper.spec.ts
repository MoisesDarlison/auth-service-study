import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoHelper as sut } from "./mongo.helper";

describe("Account MongoDb Repository", () => {
  let mongoMemoryServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    await sut.connect(mongoMemoryServer.getUri());
  });

  afterAll(async () => {
    await sut.disconnect();
    await mongoMemoryServer.stop();
  });

  it("Should reconnect if mongo is down", async () => {
    //Normal connection
    let accountCollection = await sut.getCollection("account");

    expect(accountCollection).toBeTruthy();
    expect((await accountCollection.stats()).ok).toBe(1);

    //Force disconnect DataBase
    await sut.disconnect();
    accountCollection = await sut.getCollection("account");
    const { ok } = await accountCollection.stats();
    expect(ok).toBe(1);
  });
});
