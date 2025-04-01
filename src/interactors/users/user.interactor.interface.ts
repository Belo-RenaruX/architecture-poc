import { FastifyRequest, RouteGenericInterface } from 'fastify';

import { ErrorModel } from '../../models/errors/error.model.ts';

export interface IUserInteractor<Input extends RouteGenericInterface, Output> {
  execute(input: FastifyRequest<Input>): Promise<Output | ErrorModel>;
}
