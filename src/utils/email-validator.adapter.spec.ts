import { EmailValidatorAdapter } from "./email-validator.adapter";
import emailValidator from "email-validator";

jest.mock("email-validator", () => ({
  validate(): boolean {
    return true;
  },
}));

interface SutTypes {
  sut: EmailValidatorAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidatorAdapter();
  return { sut };
};

describe("Email Validator Adapter", () => {
  it("Should return FALSE if validator return FALSE", () => {
    const { sut } = makeSut();

    jest.spyOn(emailValidator, "validate").mockReturnValueOnce(false);
    const isValid = sut.isValid("test@email.com");
    expect(isValid).toBe(false);
  });

  it("Should return TRUE if validator return TRUE", () => {
    const { sut } = makeSut();
    const isValid = sut.isValid("test@email.com");
    expect(isValid).toBe(true);
  });
});
