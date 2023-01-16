import { AccountModel } from "../models/account.model";

export interface AddAccountModel {
  nickName: string;
  email: string;
  password: string;
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel>;
}
