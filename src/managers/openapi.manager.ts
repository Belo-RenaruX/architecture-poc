import { OpenAPIRegistry, RouteConfig } from '@asteasolutions/zod-to-openapi';
import { ZodObject, ZodRawShape, ZodSchema } from 'zod';

import { ErrorResponseDTOSchema } from 'src/dtos/common/response.dto.ts';

type ZodSchemaObject = ZodObject<ZodRawShape>;
interface RouteDocParams {
  method: HttpMethod;
  path: string;
  description: string;
  tags: string[];
  query?: ZodSchemaObject;
  params?: ZodSchemaObject;
  body?: ZodSchemaObject;
  responses: Record<number, ZodSchema>;
}

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IOpenApiManager {
  registerRoute(payload: RouteDocParams): void;
  registerSchema(name: string, schema: ZodSchemaObject): void;
}

export class OpenApiManager implements IOpenApiManager {
  private readonly defaultErrorResponses: Record<number, ZodSchema> = {
    400: ErrorResponseDTOSchema,
    401: ErrorResponseDTOSchema,
    403: ErrorResponseDTOSchema,
    404: ErrorResponseDTOSchema,
    409: ErrorResponseDTOSchema,
    422: ErrorResponseDTOSchema,
    500: ErrorResponseDTOSchema,
  };

  constructor(private readonly registry: OpenAPIRegistry) {}

  public registerSchema = (name: string, schema: ZodSchemaObject) => {
    this.registry.register(name, schema);
  };

  public registerRoute = ({
    method,
    path,
    description,
    tags,
    query,
    params,
    body,
    responses,
  }: RouteDocParams): void => {
    this.registry.registerPath({
      method,
      path,
      description,
      tags,
      request: this.buildRequest(description, { query, params, body }),
      responses: this.buildResponses(description, responses),
    });
  };

  private readonly buildRequest = (
    description: string,
    {
      query,
      params,
      body,
    }: {
      query?: ZodSchemaObject;
      params?: ZodSchemaObject;
      body?: ZodSchemaObject;
    },
  ): RouteConfig['request'] => {
    const request: RouteConfig['request'] = {};

    if (query) request.query = query;
    if (params) request.params = params;

    if (body) {
      request.body = {
        description: `${description} request body`,
        content: {
          'application/json': { schema: body },
        },
      };
    }

    return request;
  };

  private readonly buildResponses = (
    description: string,
    successResponses: Record<number, ZodSchema>,
  ): RouteConfig['responses'] => {
    const allResponses: Record<number, ZodSchema> = {
      ...successResponses,
      ...this.defaultErrorResponses,
    };

    const formatted: RouteConfig['responses'] = {};

    for (const [status, schema] of Object.entries(allResponses)) {
      formatted[Number(status)] = {
        description: Number(status) >= 400 ? 'Error response' : `${description} response`,
        content: {
          'application/json': { schema },
        },
      };
    }

    return formatted;
  };
}
