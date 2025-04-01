import { ZodSchema } from 'zod';

export interface IResponseStrategy {
  getSchema(): ZodSchema;
}
