import { MissingParamNames } from "../errors/missing-param.error";
import { badRequest } from "../helpers/http.helper";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ["email", "password", "passwordConfirmation"];

    for (const field of requiredFields) {
      if (!httpRequest.body[field])
        return badRequest(new MissingParamNames(field));
    }
  }
}
