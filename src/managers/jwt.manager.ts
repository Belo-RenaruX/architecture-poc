import { FastifyInstance } from 'fastify';

export interface IJWTManager<T extends object> {
  generateToken(payload: T): string;
  verifyToken(token: string): T | null;
}

export class JWTManager<T extends object> implements IJWTManager<T> {
  constructor(private readonly fastify: FastifyInstance) {}

  public generateToken = (payload: T): string => {
    return this.fastify.jwt.sign(payload);
  };

  public verifyToken = (token: string): T | null => {
    return this.fastify.jwt.verify(token) as T;
  };
}
