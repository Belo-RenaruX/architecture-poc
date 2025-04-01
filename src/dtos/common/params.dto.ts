import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const ParamIdDTOSchema = z.preprocess(
  (val) => Number(val),
  z.number().int().positive().openapi({
    description: 'Entity ID from URL params',
    example: 1,
  }),
);

export type ParamIdDTO = z.infer<typeof ParamIdDTOSchema>;
