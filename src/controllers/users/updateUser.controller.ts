import { FastifyReply, FastifyRequest } from 'fastify';

import { UpdateUserInputDTO } from 'src/dtos/users/user.request.dto.ts';
import { IResponseInteractor } from 'src/interactors/response/response.interactor.ts';
import { UserModel } from 'src/models/users/user.model.ts';

import { IUserInteractor } from '../../interactors/users/user.interactor.interface.ts';

import { IUserController } from './user.controller.interface.ts';

export class UpdateUserController implements IUserController<UpdateUserInputDTO> {
  constructor(
    private readonly interactor: IUserInteractor<UpdateUserInputDTO, UserModel | void>,
    private readonly responseInteractor: IResponseInteractor<UserModel | void>,
  ) {}

  public handle = async (input: FastifyRequest<UpdateUserInputDTO>, reply: FastifyReply) => {
    const result = await this.interactor.execute(input);
    const response = this.responseInteractor.execute(result);
    reply.code(response.statusCode).send(response.toPlainObject());
  };
}
