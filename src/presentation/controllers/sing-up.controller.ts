import { MissingParamNames } from "../erros/missing-param.error";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.email)
      return { statusCode: 400, body: new MissingParamNames("email") };
    return { statusCode: 400, body: new MissingParamNames("password") };
  }
}
