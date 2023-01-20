import { IAddLogErrorRepository } from "../../../data/protocols/add-log-error.repository";

export class AddLogErrorRepository implements IAddLogErrorRepository {
  async log(stack: string): Promise<void> {
    console.log({ Message: "Save on TXT", stack: stack });
  }
}
