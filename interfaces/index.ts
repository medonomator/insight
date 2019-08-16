export enum ErrorStatus {
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  notAcceptable = 406,
  internalServerError = 500,
}

export interface IError {
  status: ErrorStatus;
  message: string;
}
