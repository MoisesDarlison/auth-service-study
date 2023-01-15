import { AccountModel } from "../../../domain/models/account.model";
import {
  AddAccount,
  AddAccountModel,
} from "../../../domain/use-cases/add-account.use-case";
import { Encrypter } from "./protocols/encrypter.protocol";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) => {
      resolve(null);
    });
  }
}
