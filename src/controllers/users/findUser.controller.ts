import { FastifyReply, FastifyRequest } from 'fastify';

import { FindUserInputDTO } from 'src/dtos/users/user.request.dto.ts';
import { IResponseInteractor } from 'src/interactors/response/response.interactor.ts';
import { UserModel } from 'src/models/users/user.model.ts';

import { IUserInteractor } from '../../interactors/users/user.interactor.interface.ts';

import { IUserController } from './user.controller.interface.ts';

export class FindUserController implements IUserController<FindUserInputDTO> {
  constructor(
    private readonly interactor: IUserInteractor<FindUserInputDTO, UserModel>,
    private readonly responseInteractor: IResponseInteractor<UserModel>,
  ) {}

  public handle = async (input: FastifyRequest<FindUserInputDTO>, reply: FastifyReply) => {
    const result = await this.interactor.execute(input);
    const response = this.responseInteractor.execute(result);
    reply.code(response.statusCode).send(response.toPlainObject());
  };
}
