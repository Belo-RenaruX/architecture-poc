export class ErrorModel {
  public readonly statusCode: number;
  public readonly error: string;
  public readonly detail?: string;

  constructor(statusCode: number, error: string, detail?: string) {
    this.statusCode = statusCode;
    this.error = error;
    this.detail = detail;
  }

  public static fromError = (error: unknown): ErrorModel => {
    if (error instanceof Error) {
      return new ErrorModel(500, error.message);
    }
    if (error instanceof ErrorModel) {
      return error;
    }
    return new ErrorModel(500, 'An unknown error occurred');
  };
}
