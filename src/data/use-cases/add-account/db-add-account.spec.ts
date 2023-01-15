import { DbAddAccount } from "./db-add-account";
import { Encrypter } from "./protocols/encrypter.protocol";

interface SutTypes {
  sut: DbAddAccount;
  encryptStub: Encrypter;
}

const makeEncrypter = (): Encrypter => {
  class EncryptStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncryptStub();
};

const makeSut = (): SutTypes => {
  const encryptStub = makeEncrypter();
  const sut = new DbAddAccount(encryptStub);

  return { sut, encryptStub };
};

describe("DbAddAccount UseCase", () => {
  it("Should call Encrypt with correct password", async () => {
    const { sut, encryptStub } = makeSut();
    const encryptSpy = jest.spyOn(encryptStub, "encrypt");

    const accountInput = {
      nickName: "nickName",
      email: "test@email.com",
      password: "input_password",
    };

    await sut.add(accountInput);

    expect(encryptSpy).toHaveBeenCalledWith("input_password");
  });

  it("Should throw if encrypter throws", async () => {
    const { sut, encryptStub } = makeSut();
    jest
      .spyOn(encryptStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const accountInput = {
      nickName: "nickName",
      email: "test@email.com",
      password: "input_password",
    };

    const accountPromise = sut.add(accountInput);

    await expect(accountPromise).rejects.toThrow();
  });
});
