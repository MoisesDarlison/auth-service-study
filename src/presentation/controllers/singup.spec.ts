import { SignUpController } from "./sing-up.controller";

describe("SignUp Controller", () => {
  it("should return 400 if no email is provided", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing Params: email"));
  });
});
