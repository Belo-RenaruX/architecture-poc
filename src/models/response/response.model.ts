import { ErrorModel } from '../errors/error.model.ts';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  details: string[];
}

interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export class ResponseModel<T> {
  private readonly body: ErrorResponse | SuccessResponse<T>;
  public readonly statusCode: number;

  constructor(private readonly data?: T | ErrorModel) {
    if (this.data instanceof ErrorModel) {
      this.statusCode = this.data.statusCode;
      this.body = {
        statusCode: this.data.statusCode,
        message: this.data.message,
        error: this.data.error,
        details: this.data.details,
      };
      return;
    }
    if (!this.data) {
      this.statusCode = 204;
      this.body = {
        statusCode: 204,
        message: 'No Content',
      };
    } else {
      this.statusCode = 200;
      this.body = {
        statusCode: 200,
        message: 'Success',
        data: this.data as T,
      };
    }
  }

  public toPlainObject = (): ErrorResponse | SuccessResponse<T> => {
    return this.data instanceof ErrorModel
      ? this.body
      : (Object.fromEntries(
          Object.entries(this.body).filter(([_, value]) => value !== undefined),
        ) as SuccessResponse<T>);
  };
}
