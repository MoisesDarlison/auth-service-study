import { DbAddAccount } from "../../data/use-cases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/criptography/bcrypt.adapter";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account";
import { SignUpController } from "../../presentation/controllers/sign-up/sing-up.controller";
import { EmailValidatorAdapter } from "../../utils/email-validator.adapter";

export const makeSignUpController = (): SignUpController => {
  const salt: number = 12;
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(encrypter, addAccountRepository);

  return new SignUpController(emailValidator, addAccount);
};
