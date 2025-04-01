import { z, ZodSchema, ZodType } from 'zod';

import { ErrorResponseDTOSchema, SuccessResponseDTOSchema } from 'src/dtos/common/response.dto.ts';

import { IResponseStrategy } from './response.strategy.interface.ts';

export class HybridResponseStrategy<T> implements IResponseStrategy {
  constructor(private readonly dataSchema: ZodType<T>) {}

  public getSchema = (): ZodSchema => {
    return z.union([SuccessResponseDTOSchema.extend({ data: this.dataSchema }), ErrorResponseDTOSchema]);
  };
}
