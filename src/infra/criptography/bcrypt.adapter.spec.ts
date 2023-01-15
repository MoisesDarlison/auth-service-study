import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt.adapter";

jest.mock("bcrypt", () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve("hashed_value"));
  },
}));

interface SutTypes {
  sut: BcryptAdapter;
  salt: number;
}
const makeSut = (): SutTypes => {
  const salt = 10;
  const sut = new BcryptAdapter(salt);
  return {
    sut,
    salt,
  };
};

describe("Bcrypt Adapter", () => {
  it("Should call bcrypt with correct values", async () => {
    const { sut, salt } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "hash");

    await sut.encrypt("value_input");
    expect(hashSpy).toHaveBeenCalledWith("value_input", salt);
  });

  it("Should return a hash on success", async () => {
    const { sut } = makeSut();

    const hash = await sut.encrypt("value_input");
    expect(hash).toBe("hashed_value");
  });
});
