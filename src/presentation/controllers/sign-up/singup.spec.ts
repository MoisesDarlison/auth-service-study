import {
  InvalidParamError,
  MissingParamNames,
  ServerError,
} from "../../errors";
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  EmailValidator,
} from "./sign-up.protocols";

import { SignUpController } from "./sing-up.controller";

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "test_uuid",
        nickName: "test_nickname",
        email: "test_email@example.com",
        password: "test_password",
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountStub();
};

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return { sut, emailValidatorStub, addAccountStub };
};

describe("SignUp Controller", () => {
  it("Should return 400 if no email is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamNames("email"));
  });

  it("Should return 400 if no Password is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "test@example.com",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamNames("password"));
  });

  it("Should return 400 if no passwordConfirmation is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamNames("passwordConfirmation")
    );
  });

  it("Should return 400 if no passwordConfirmation fails", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
        passwordConfirmation: "diff",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError("passwordConfirmation")
    );
  });

  it("Should return 400 if an invalid email is provided", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError("email"));
  });

  it("Should call EmailValidator with correct email", async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");

    const httpRequest = {
      body: {
        email: "spy_test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    await sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith("spy_test@example.com");
    expect(isValidSpy).not.toHaveBeenCalledWith("any");
  });

  it("Should return 500 if emailValidator throw", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });

    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("Should call AddAccount with correct values", async () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, "add");

    const httpRequest = {
      body: {
        email: "spy_test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      email: "spy_test@example.com",
      password: "password_test",
    });
  });

  it("Should return 500 if AddAccount throws", async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, "add").mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });

    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it("Should return 200 if valid data is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "test@example.com",
        password: "password_test",
        passwordConfirmation: "password_test",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: "test_uuid",
      nickName: "test_nickname",
      email: "test_email@example.com",
      password: "test_password",
    });
  });
});
