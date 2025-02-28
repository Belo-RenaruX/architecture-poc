import { ErrorModel } from "../../models/errors/error.model.ts";
import { UserModel } from "../../models/users/user.model.ts";
import { UserSignInModel } from "../../models/users/userSignin.model.ts";

export interface IUserInteractor {
  execute(): Promise<
    UserModel | UserModel[] | UserSignInModel | ErrorModel | void
  >
}