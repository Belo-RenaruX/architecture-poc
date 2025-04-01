import { FastifyRequest } from 'fastify';

import { DeleteUserInputDTO, DeleteUserParamDTOSchema } from 'src/dtos/users/user.request.dto.ts';

import { ErrorModel } from '../../models/errors/error.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class DeleteUserInteractor implements IUserInteractor<DeleteUserInputDTO, void> {
  constructor(private readonly repository: IUserRepository) {}

  public execute = async (input: FastifyRequest<DeleteUserInputDTO>) => {
    const { params } = input;
    try {
      const { id } = DeleteUserParamDTOSchema.parse(params);
      await this.repository.deleteUser(id);
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
