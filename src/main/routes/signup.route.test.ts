import request from "supertest";
import { app } from "../config/app";

describe("SignUp Route", () => {
  it("Should return an account on success", async () => {
    await request(app)
      .post("/v1/api/signup")
      .send({
        nickName: "Test",
        email: "test@email.com",
        password: "password",
        confirmationPassword: "password",
      })
      .expect(200);
  });
});
