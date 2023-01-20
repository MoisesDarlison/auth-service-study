import { IAddLogErrorRepository } from "../../data/protocols/add-log-error.repository";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols";

export class LogsControllerDecorator implements Controller {
  private readonly controller: Controller;
  private readonly addLogErrorRepository: IAddLogErrorRepository;
  constructor(
    controller: Controller,
    addLogErrorRepository: IAddLogErrorRepository
  ) {
    this.controller = controller;
    this.addLogErrorRepository = addLogErrorRepository;
  }
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      this.addLogErrorRepository.log(httpResponse.body?.stack);
    }

    return this.controller.handle(httpRequest);
  }
}
