export class HttpStatusHelper {
  public static readonly Messages: Record<number, string> = {
    200: 'Success',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
  };

  public static getMessage = (statusCode: number): string => {
    return HttpStatusHelper.Messages[statusCode] ?? 'Unknown Status';
  };
}
