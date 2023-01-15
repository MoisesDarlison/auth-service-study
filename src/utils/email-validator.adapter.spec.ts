import { EmailValidatorAdapter } from "./email-validator.adapter";
import emailValidator from "email-validator";

jest.mock("email-validator", () => ({
  validate(): boolean {
    return true;
  },
}));

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe("Email Validator Adapter", () => {
  it("Should return FALSE if validator return FALSE", () => {
    const sut = makeSut();
    jest.spyOn(emailValidator, "validate").mockReturnValueOnce(false);
    const isValid = sut.isValid("test@email.com");
    expect(isValid).toBe(false);
  });

  it("Should return TRUE if validator return TRUE", () => {
    const sut = makeSut();
    const isValid = sut.isValid("test@email.com");
    expect(isValid).toBe(true);
  });

  it("Should call emailValidator with correct email", () => {
    const sut = makeSut();

    const isEmailSpy = jest.spyOn(emailValidator, "validate");

    sut.isValid("test@email.com");
    expect(isEmailSpy).toHaveBeenCalledWith("test@email.com");
  });
});
