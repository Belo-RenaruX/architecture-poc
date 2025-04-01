import { FastifyReply, FastifyRequest } from 'fastify';

import { SignInUserInputDTO } from 'src/dtos/users/user.request.dto.ts';
import { IResponseInteractor } from 'src/interactors/response/response.interactor.ts';
import { UserSignInModel } from 'src/models/users/userSignin.model.ts';

import { IUserInteractor } from '../../interactors/users/user.interactor.interface.ts';

import { IUserController } from './user.controller.interface.ts';

export class SignInUserController implements IUserController<SignInUserInputDTO> {
  constructor(
    private readonly interactor: IUserInteractor<SignInUserInputDTO, UserSignInModel>,
    private readonly responseInteractor: IResponseInteractor<UserSignInModel>,
  ) {}

  public handle = async (input: FastifyRequest<SignInUserInputDTO>, reply: FastifyReply) => {
    const result = await this.interactor.execute(input);
    const response = this.responseInteractor.execute(result);
    reply.code(response.statusCode).send(response.toPlainObject());
  };
}
