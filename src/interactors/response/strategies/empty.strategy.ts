import { z, ZodSchema } from 'zod';

import { NoContentResponseDTOSchema, ErrorResponseDTOSchema } from 'src/dtos/common/response.dto.ts';

import { IResponseStrategy } from './response.strategy.interface.ts';

export class EmptyResponseStrategy implements IResponseStrategy {
  public getSchema = (): ZodSchema => {
    return z.union([NoContentResponseDTOSchema, ErrorResponseDTOSchema]);
  };
}
