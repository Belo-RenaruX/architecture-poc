import { FastifyReply } from 'fastify';

import { IUserInteractor } from '../../interactors/users/user.interactor.interface.ts';
import { ResponseModel } from '../../models/response/response.model.ts';

import { IUserController } from './user.controller.interface.ts';

export class GetAllUsersController implements IUserController {
  constructor(
    private readonly interactor: IUserInteractor,
    private readonly reply: FastifyReply,
  ) {}

  public handle = async (): Promise<void> => {
    const result = await this.interactor.execute();
    const response = new ResponseModel(result);
    this.reply.code(response.statusCode).send(response.toPlainObject());
  };
}
