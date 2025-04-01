import { FastifyReply, FastifyRequest } from 'fastify';

import { DeleteUserInputDTO } from 'src/dtos/users/user.request.dto.ts';
import { IResponseInteractor } from 'src/interactors/response/response.interactor.ts';

import { IUserInteractor } from '../../interactors/users/user.interactor.interface.ts';

import { IUserController } from './user.controller.interface.ts';

export class DeleteUserController implements IUserController<DeleteUserInputDTO> {
  constructor(
    private readonly interactor: IUserInteractor<DeleteUserInputDTO, void>,
    private readonly responseInteractor: IResponseInteractor<void>,
  ) {}

  public handle = async (input: FastifyRequest<DeleteUserInputDTO>, reply: FastifyReply) => {
    const result = await this.interactor.execute(input);
    const response = this.responseInteractor.execute(result);
    reply.code(response.statusCode).send(response.toPlainObject());
  };
}
