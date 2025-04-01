import { FastifyRequest } from 'fastify';

import { FindUserInputDTO, FindUserParamDTOSchema } from 'src/dtos/users/user.request.dto.ts';

import { ErrorModel } from '../../models/errors/error.model.ts';
import { UserModel } from '../../models/users/user.model.ts';
import { IUserRepository } from '../../repositories/users/user.repository.interface.ts';

import { IUserInteractor } from './user.interactor.interface.ts';

export class FindUserInteractor implements IUserInteractor<FindUserInputDTO, UserModel> {
  constructor(private readonly repository: IUserRepository) {}

  public execute = async (input: FastifyRequest<FindUserInputDTO>) => {
    const { params } = input;
    try {
      const { id } = FindUserParamDTOSchema.parse(params);
      const user = await this.repository.findUserById(id);
      if (!user) throw new ErrorModel(404, `User with id: ${id} doesn't exists.`);
      const model = new UserModel(user);
      return model;
    } catch (error) {
      return ErrorModel.fromError(error);
    }
  };
}
