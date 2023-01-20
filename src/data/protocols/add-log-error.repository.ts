export interface IAddLogErrorRepository {
  log(stack: string): Promise<void>;
}
