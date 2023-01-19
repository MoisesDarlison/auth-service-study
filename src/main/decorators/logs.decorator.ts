import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols";

export class LogsControllerDecorator implements Controller {
  private readonly controller: Controller;
  constructor(controller: Controller) {
    this.controller = controller;
  }
  handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return this.controller.handle(httpRequest);
  }
}
