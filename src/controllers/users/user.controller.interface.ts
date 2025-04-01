import { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

export interface IUserController<Input extends RouteGenericInterface> {
  handle(input: FastifyRequest<Input>, reply: FastifyReply): Promise<void>;
}
