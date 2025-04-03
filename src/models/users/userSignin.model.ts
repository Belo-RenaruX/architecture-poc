import { UserModel } from './user.model.ts';

export class UserSignInModel {
  public readonly token: string;
  public readonly user: UserModel;

  constructor(user: UserModel, token: string) {
    this.user = user;
    this.token = token;
  }
}
