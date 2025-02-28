export class ErrorModel {
  readonly statusCode: number;
  readonly message: string;
  readonly error: string;
  readonly details: string[];

  constructor(statusCode: number, message: string, error: string, details?: string[]) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.details = details || [];
  }

  static fromError(error: unknown, statusCode = 500): ErrorModel {
    if (error instanceof Error) {
      return new ErrorModel(statusCode, error.message, error.name);
    }
    if (error instanceof ErrorModel) {
      return error;
    }
    return new ErrorModel(statusCode, 'An unknown error occurred', 'UnknownError');
  }
}