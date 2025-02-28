import { UserSessionDTO } from "../../dtos/users/user.dto";
import { UserModel } from "./user.model";
import { IJWTManager } from "../../managers/jwt.manager";

export class UserSignInModel {
  readonly token: string;
  readonly user: UserModel;

  constructor(
    user: UserModel,
    private jwtManager: IJWTManager<UserSessionDTO>
  ) {
    this.user = user;
    this.token = this.jwtManager.generateToken(user);
  }
}
