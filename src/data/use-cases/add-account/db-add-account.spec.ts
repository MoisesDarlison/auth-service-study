import { DbAddAccount } from "./db-add-account";
import { Encrypter } from "./protocols/encrypter.protocol";

class EncryptStub implements Encrypter {
  async encrypt(value: string): Promise<string> {
    return new Promise((resolve) => resolve("hashed_password"));
  }
}

interface SutTypes {
  sut: DbAddAccount;
  encryptStub: Encrypter;
}

const makeSut = (): SutTypes => {
  const encryptStub = new EncryptStub();
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
});
