import { HttpStatusHelper } from 'src/helpers/status.helper.ts';

import { ErrorModel } from '../errors/error.model.ts';

export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  statusMessage: string;
  error: string;
  detail: string;
}

export interface SuccessResponse<T> {
  success: boolean;
  statusCode: number;
  statusMessage: string;
  data?: T;
}

export class ResponseModel<T> {
  private readonly body: ErrorResponse | SuccessResponse<T>;
  public readonly statusCode: number;

  constructor(private readonly data?: T | ErrorModel) {
    switch (true) {
      case this.data instanceof ErrorModel:
        this.statusCode = this.data.statusCode;
        this.body = {
          success: false,
          statusCode: this.data.statusCode,
          statusMessage: HttpStatusHelper.getMessage(this.data.statusCode),
          error: this.data.error,
          detail: this.data.detail,
        };
        break;
      case !!this.data:
        this.statusCode = 200;
        this.body = {
          success: true,
          statusCode: 200,
          statusMessage: HttpStatusHelper.getMessage(200),
          data: this.data as T,
        };
        break;
      default:
        this.statusCode = 204;
        this.body = {
          success: true,
          statusCode: 204,
          statusMessage: HttpStatusHelper.getMessage(204),
        };
        break;
    }
  }

  public toPlainObject = (): ErrorResponse | SuccessResponse<T> => {
    return Object.fromEntries(Object.entries(this.body).filter(([_, value]) => value !== undefined)) as
      | ErrorResponse
      | SuccessResponse<T>;
  };
}
