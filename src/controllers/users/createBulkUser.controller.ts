import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateBulkUserInputDTO } from 'src/dtos/users/user.request.dto.ts';
import { IResponseInteractor } from 'src/interactors/response/response.interactor.ts';

import { IUserInteractor } from '../../interactors/users/user.interactor.interface.ts';

import { IUserController } from './user.controller.interface.ts';

export class CreateBulkUserController implements IUserController<CreateBulkUserInputDTO> {
  constructor(
    private readonly interactor: IUserInteractor<CreateBulkUserInputDTO, void>,
    private readonly responseInteractor: IResponseInteractor<void>,
  ) {}

  public handle = async (input: FastifyRequest<CreateBulkUserInputDTO>, reply: FastifyReply) => {
    const result = await this.interactor.execute(input);
    const response = this.responseInteractor.execute(result);
    reply.code(response.statusCode).send(response.toPlainObject());
  };
}
