import { FastifyReply, FastifyRequest } from 'fastify';

import { GetAllUsersInputDTO } from 'src/dtos/users/user.request.dto.ts';
import { IResponseInteractor } from 'src/interactors/response/response.interactor.ts';
import { UserModel } from 'src/models/users/user.model.ts';

import { IUserInteractor } from '../../interactors/users/user.interactor.interface.ts';

import { IUserController } from './user.controller.interface.ts';

export class GetAllUsersController implements IUserController<GetAllUsersInputDTO> {
  constructor(
    private readonly interactor: IUserInteractor<GetAllUsersInputDTO, UserModel[]>,
    private readonly responseInteractor: IResponseInteractor<UserModel[]>,
  ) {}

  public handle = async (input: FastifyRequest<GetAllUsersInputDTO>, reply: FastifyReply) => {
    const result = await this.interactor.execute(input);
    const response = this.responseInteractor.execute(result);
    reply.code(response.statusCode).send(response.toPlainObject());
  };
}
