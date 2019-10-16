export enum ErrorCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_ACCEPTABLE = 406,
  INTERNAL_SERVER_ERROR = 500,
}

export interface ISystemError {
  code: ErrorCode;
  message: string;
}
