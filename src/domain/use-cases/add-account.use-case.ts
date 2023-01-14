import { AccountModel } from "../models/account.model";

export interface AddAccountModel {
  email: string;
  password: string;
}

export interface AddAccount {
  add(account: AddAccountModel): AccountModel;
}
