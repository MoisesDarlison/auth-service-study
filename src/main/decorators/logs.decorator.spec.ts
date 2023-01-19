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
      return new Promise((resolve) => resolve(httpResponse));
    }
  }
  return new ControllerStub();
};

const makeStub = () => {
  const fakeController = makeControllerStub();
  const sut = new LogsControllerDecorator(fakeController);
  return {
    fakeController,
    sut,
  };
};

describe("LogsController Decorator", () => {
  it("Should return the some result of controller", () => {
    const { fakeController, sut } = makeStub();

    const httpRequest: HttpRequest = {
      body: {
        email: "email@example.com",
      },
    };

    const initialData = fakeController.handle(httpRequest);
    const sutResponse = sut.handle(httpRequest);

    expect(sutResponse).toEqual(initialData);
  });
});
