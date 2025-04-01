import { FastifyRequest } from 'fastify';

import { GetAllUsersInputDTO, GetAllUsersQueryDTOSchema } from 'src/dtos/users/user.request.dto.ts';

import { ErrorModel } from '../../models/errors/error.model.ts';
import { UserModel } from '../../models/users/user.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class GetAllUsersInteractor implements IUserInteractor<GetAllUsersInputDTO, UserModel[]> {
  constructor(private readonly repository: IUserRepository) {}

  public execute = async (input: FastifyRequest<GetAllUsersInputDTO>) => {
    const { query } = input;
    try {
      const { nameSearch } = GetAllUsersQueryDTOSchema.parse({ query });
      const users = await this.repository.getAllUsers(nameSearch);
      const models = users.map((user) => new UserModel(user));
      return models;
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
