import { FastifyRequest } from 'fastify';

import { SignInUserInputDTO, SignInUserBodyDTOSchema } from 'src/dtos/users/user.request.dto.ts';

import { IEncryptionManager } from '../../managers/encryption.manager.ts';
import { IJWTManager } from '../../managers/jwt.manager.ts';
import { ErrorModel } from '../../models/errors/error.model.ts';
import { UserModel } from '../../models/users/user.model.ts';
import { UserSignInModel } from '../../models/users/userSignin.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class SignInUserInteractor implements IUserInteractor<SignInUserInputDTO, UserSignInModel> {
  constructor(
    private readonly repository: IUserRepository,
    private readonly encryptionManager: IEncryptionManager,
    private readonly jwtManager: IJWTManager<UserModel>,
  ) {}

  public execute = async (input: FastifyRequest<SignInUserInputDTO>) => {
    const { body } = input;
    try {
      const { email, password } = SignInUserBodyDTOSchema.parse({ body });
      const user = await this.repository.signInUser(email);
      if (!user) throw new ErrorModel(400, `Invalid credentials`, 'Bad Request');
      const isValidPassword = await this.encryptionManager.comparePassword(
        password,
        user.passwordHash,
        user.passwordSalt,
      );
      if (!isValidPassword) throw new ErrorModel(400, `Invalid credentials`, 'Bad Request');
      const model = new UserModel(user);
      const signInModel = new UserSignInModel(model, this.jwtManager);
      return signInModel;
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
