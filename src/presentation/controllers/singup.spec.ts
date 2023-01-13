import { InvalidParamError, MissingParamNames, ServerError } from "../errors";
import { EmailValidator } from "../protocols";
import { SignUpController } from "./sing-up.controller";

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}
const makeSut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new SignUpController(emailValidatorStub);
  return { sut, emailValidatorStub };
};

describe("SignUp Controller", () => {
  it("Should return 400 if no email is provided", () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "test@example.com",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamNames("password"));
  });

  it("Should return 400 if no passwordConfirmation is provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamNames("passwordConfirmation")
    );
  });

  it("Should return 400 if an invalid email is provided", () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  it("Should call EmailValidator with correct email", () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        email: "spy_test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("spy_test@example.com");
    expect(isValidSpy).not.toHaveBeenCalledWith("any");
  });

  it("Should return 500 if emailValidator throw", () => {
    class EmailValidatorStub implements EmailValidator {
      isValid(email: string): boolean {
        throw new Error();
      }
    }
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new SignUpController(emailValidatorStub);

    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
