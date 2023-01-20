import { IAddLogErrorRepository } from "../../data/protocols/add-log-error.repository";
import { serverError } from "../../presentation/helpers/http.helper";
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
        statusCode: 500,
        body: {
          id: "test",
        },
      };
      return new Promise((resolve) => resolve(httpResponse));
    }
  }
  return new ControllerStub();
};

const makeAddErrorRepository = (): IAddLogErrorRepository => {
  class FakeAddErrorRepository implements IAddLogErrorRepository {
    async log(stack: string): Promise<void> {}
  }

  return new FakeAddErrorRepository();
};

const makeError = () => {
  const fakeError = new Error();
  fakeError.stack = "fake_stack";
  return serverError(fakeError);
};

type sutTypes = {
  sut: LogsControllerDecorator;
  fakeController: Controller;
  fakeAddErrorRepository: IAddLogErrorRepository;
};

const makeStub = (): sutTypes => {
  const fakeController = makeControllerStub();
  const fakeAddErrorRepository = makeAddErrorRepository();
  const sut = new LogsControllerDecorator(
    fakeController,
    fakeAddErrorRepository
  );

  return {
    sut,
    fakeController,
    fakeAddErrorRepository,
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

  it("Should call AddErrorRepository with correct errors if controller return a server error", async () => {
    const { fakeAddErrorRepository, fakeController, sut } = makeStub();

    const error = makeError();
    const logSpy = jest.spyOn(fakeAddErrorRepository, "log");

    jest
      .spyOn(fakeController, "handle")
      .mockReturnValueOnce(new Promise((resolve) => resolve(error)));

    const httpRequest: HttpRequest = {
      body: {
        email: "email@example.com",
      },
    };

    await sut.handle(httpRequest);

    expect(logSpy).toHaveBeenCalledWith("fake_stack");
  });
});
