import {
  AddAccount,
  AddAccountModel,
  AccountModel,
  Encrypter,
  AddAccountRepository,
} from "./db-add-account.protocols";

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;
  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository
  ) {
    this.addAccountRepository = addAccountRepository;
    this.encrypter = encrypter;
  }

  async add(accountInput: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountInput.password);
    const account = await this.addAccountRepository.add({
      ...accountInput,
      password: hashedPassword,
    });

    return account;
  }
}
