import { AddAccountRepository } from "../../../../data/protocols/add-account-repository.protocol";
import { AccountModel } from "../../../../domain/models/account.model";
import { AddAccountModel } from "../../../../domain/use-cases/add-account.use-case";
import { MongoHelper } from "../../../helpers/mongo.helper";

export class AccountMongoRepository implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection("accounts");
    const { insertedId } = await accountCollection.insertOne(account);
    const id: string = insertedId.toString();

    return Object.assign({}, account, { id });
  }
}
