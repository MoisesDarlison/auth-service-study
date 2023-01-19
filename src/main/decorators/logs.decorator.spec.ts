import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols";
import { LogsControllerDecorator } from "./logs.decorator";

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          id: "test",
        },
      };
      return new Promise((resolve, reject) => resolve(httpResponse));
    }
  }
  return new ControllerStub();
};

describe("LogsController Decorator", () => {
  it("Should return the some result of controller", () => {
    const initialController = makeControllerStub();
    const sut = new LogsControllerDecorator(initialController);
    const httpRequest: HttpRequest = {
      body: {
        email: "email@example.com",
      },
    };

    const initialData = initialController.handle(httpRequest);
    const sutResponse = sut.handle(httpRequest);

    expect(sutResponse).toEqual(initialData);
  });
});
