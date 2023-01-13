import { MissingParamNames } from "../errors/missing-param.error";
import { badRequest } from "../helpers/http.helper";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.email)
      return badRequest(new MissingParamNames("email"));
    return badRequest(new MissingParamNames("password"));
  }
}
