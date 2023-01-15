import { DbAddAccount } from "./db-add-account";
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from "./db-add-account.protocols";

const makeEncrypter = (): Encrypter => {
  class EncryptStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncryptStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "test_uuid",
        nickName: "nickName",
        email: "test@email.com",
        password: "hashed_password",
      };
      return new Promise((resolve) => {
        resolve(fakeAccount);
      });
    }
  }
  return new AddAccountRepositoryStub();
};

interface SutTypes {
  sut: DbAddAccount;
  encryptStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}
const makeSut = (): SutTypes => {
  const encryptStub = makeEncrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(encryptStub, addAccountRepositoryStub);

  return { sut, encryptStub, addAccountRepositoryStub };
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

  it("Should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");

    const accountInput = {
      nickName: "nickName",
      email: "test@email.com",
      password: "input_password",
    };

    await sut.add(accountInput);

    expect(addSpy).toHaveBeenCalledWith({
      nickName: "nickName",
      email: "test@email.com",
      password: "hashed_password",
    });
  });

  it("Should throw if AddAccountRepository throws", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "add")
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

  it("Should return an account if on success", async () => {
    const { sut } = makeSut();

    const accountInput = {
      nickName: "nickName",
      email: "test@email.com",
      password: "input_password",
    };

    const accountOutput = await sut.add(accountInput);

    expect(accountOutput).toEqual({
      id: "test_uuid",
      nickName: "nickName",
      email: "test@email.com",
      password: "hashed_password",
    });
  });
});
