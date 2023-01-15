import { EmailValidatorAdapter } from "./email-validator.adapter";

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
    const isValid = sut.isValid("invalid_email");
    expect(isValid).toBe(false);
  });
});
