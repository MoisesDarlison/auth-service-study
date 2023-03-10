import { DbAddAccount } from "../../data/use-cases/add-account/db-add-account";
import { BcryptAdapter } from "../../infra/cryptography/bcrypt.adapter";
import { AddLogErrorRepository } from "../../infra/db/in-files/log-error";
import { AccountMongoRepository } from "../../infra/db/mongodb/account-repository/account";
import { SignUpController } from "../../presentation/controllers/sign-up/sing-up.controller";
import { Controller } from "../../presentation/protocols";
import { EmailValidatorAdapter } from "../../utils/email-validator.adapter";
import { LogsControllerDecorator } from "../decorators/logs.decorator";

export const makeSignUpController = (): Controller => {
  const salt: number = 12;
  const emailValidator = new EmailValidatorAdapter();
  const encrypter = new BcryptAdapter(salt);
  const addAccountRepository = new AccountMongoRepository();
  const addAccount = new DbAddAccount(encrypter, addAccountRepository);
  const signUpController = new SignUpController(emailValidator, addAccount);
  /**
   * Por escolha pessoal inicialmente vou salvar num txt os erros e não no banco de dados
   */
  const addLogErrorRepository = new AddLogErrorRepository();
  return new LogsControllerDecorator(signUpController, addLogErrorRepository);
};
