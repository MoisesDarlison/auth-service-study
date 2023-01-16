import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoHelper } from "../../../helpers/mongo.helper";
import { AccountMongoRepository } from "./account";

const makeSut = (): AccountMongoRepository => new AccountMongoRepository();

describe("Account MongoDb Repository", () => {
  let mongoMemoryServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    await MongoHelper.connect(mongoMemoryServer.getUri());
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
    await mongoMemoryServer.stop();
  });

  it("Should return a account on success", async () => {
    const sut = makeSut();

    const account = await sut.add({
      nickName: "test",
      email: "test@example.com",
      password: "test_password",
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account).toMatchObject({
      nickName: "test",
      email: "test@example.com",
      password: "test_password",
    });
  });
});
