import { EmailValidator } from "../presentation/protocols/email-validator.protocol";
import emailValidator from "email-validator";

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return emailValidator.validate(email);
  }
}
