import { UserSessionDTO } from "../../dtos/users/user.dto.ts";
import { UserModel } from "./user.model.ts";
import { IJWTManager } from "../../managers/jwt.manager.ts";

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
