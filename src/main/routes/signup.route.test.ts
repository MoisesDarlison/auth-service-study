import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { MongoHelper } from "../../infra/helpers/mongo.helper";
import { app } from "../config/app";

describe("SignUp Route", () => {
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

  it("Should return an account on success", async () => {
    await request(app)
      .post("/v1/api/signup")
      .send({
        nickName: "Test",
        email: "test@email.com",
        password: "password",
        passwordConfirmation: "password",
      })
      .expect(200);
  });
});
