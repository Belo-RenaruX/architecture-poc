import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const BodyReturningDTOSchema = z.object({
  returning: z.boolean().optional().openapi({
    description: 'Should return the entity after transaction',
    example: false,
    default: false,
  }),
});

export type BodyReturningDTO = z.infer<typeof BodyReturningDTOSchema>;
