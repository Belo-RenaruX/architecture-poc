import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { HttpStatusHelper } from 'src/helpers/status.helper.ts';

extendZodWithOpenApi(z);

export const ErrorResponseDTOSchema = z.object({
  success: z.literal(false).openapi({
    description: 'Indicates the request failed.',
    example: false,
  }),
  statusCode: z.number().min(400).max(599).openapi({
    description: 'HTTP status code for the error.',
    example: 599,
  }),
  statusMessage: z.string().openapi({
    description: 'Textual description of the status.',
    example: 'HTTP Error',
  }),
  error: z.string().openapi({
    description: 'Raw internal error message.',
    example: 'Generic error',
  }),
  detail: z.string().optional().openapi({
    description: 'Optional detailed explanation of the error.',
    example: 'User with ID 123 does not exist.',
  }),
});

export const NoContentResponseDTOSchema = z.object({
  success: z.literal(true).openapi({
    description: 'Indicates the request was successful.',
    example: true,
  }),
  statusCode: z.literal(204).openapi({
    description: 'HTTP status code for the success response',
    example: 204,
  }),
  statusMessage: z.literal(HttpStatusHelper.getMessage(204)).openapi({
    description: 'Textual description of the status.',
    example: 'No Content',
  }),
});

export const SuccessResponseDTOSchema = z.object({
  success: z.literal(true).openapi({
    description: 'Indicates the request was successful.',
    example: true,
  }),
  statusCode: z.literal(200).openapi({
    description: 'HTTP status code for the success response',
    example: 200,
  }),
  statusMessage: z.literal(HttpStatusHelper.getMessage(200)).openapi({
    description: 'Textual description of the status.',
    example: 'Success',
  }),
});

export type ErrorResponseDTO = z.infer<typeof ErrorResponseDTOSchema>;
export type NoContentResponseDTO = z.infer<typeof NoContentResponseDTOSchema>;
export type SuccessResponseDTO = z.infer<typeof SuccessResponseDTOSchema>;
