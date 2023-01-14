import { InvalidParamError, MissingParamNames } from "../../errors";
import { badRequest, serverError, ok } from "../../helpers/http.helper";
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse,
  AddAccount,
} from "./sign-up.protocols";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ["email", "password", "passwordConfirmation"];

      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamNames(field));
      }
      const { email, password, passwordConfirmation } = httpRequest.body;

      if (passwordConfirmation !== password)
        return badRequest(new InvalidParamError("passwordConfirmation"));

      const isValidEmail = this.emailValidator.isValid(email);
      if (!isValidEmail) return badRequest(new InvalidParamError("email"));

      const account = await this.addAccount.add({
        email,
        password,
      });
      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}
