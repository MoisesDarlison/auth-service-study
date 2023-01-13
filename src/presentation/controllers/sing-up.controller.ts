import { MissingParamNames } from "../errors/missing-param.error";
import { badRequest } from "../helpers/http.helper";
import { HttpRequest, HttpResponse } from "../protocols/http.protocol";
import { Controller } from "../protocols/controller.protocol";
import { EmailValidator } from "../protocols/email-validator.protocol";
import { InvalidParamError } from "../errors/invalid-param.error";

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ["email", "password", "passwordConfirmation"];

    for (const field of requiredFields) {
      if (!httpRequest.body[field])
        return badRequest(new MissingParamNames(field));
    }
    const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);
    if (!isValidEmail) return badRequest(new InvalidParamError("email"));
  }
}
