import { IJWTManager } from '../../managers/jwt.manager.ts';

import { UserModel } from './user.model.ts';

export class UserSignInModel {
  public readonly token: string;
  public readonly user: UserModel;

  constructor(
    user: UserModel,
    private readonly jwtManager: IJWTManager<UserModel>,
  ) {
    this.user = user;
    this.token = this.jwtManager.generateToken(user);
  }
}
