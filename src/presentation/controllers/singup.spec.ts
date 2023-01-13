import { MissingParamNames } from "../errors/missing-param.error";
import { SignUpController } from "./sing-up.controller";

describe("SignUp Controller", () => {
  it("Should return 400 if no email is provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamNames("email"));
  });

  it("Should return 400 if no Password is provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: "test@example.com",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamNames("password"));
  });
});
