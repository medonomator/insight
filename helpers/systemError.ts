import { ISystemError, ErrorCode } from '../interfaces';

export default class SystemError extends Error {
  private _code: ErrorCode;
  private _message: string;
  public constructor(error: ISystemError) {
    super();
    this._code = error.code || ErrorCode.BAD_REQUEST;
    this._message = error.message;
  }
  public get code(): ErrorCode {
    return this._code;
  }
  public get message(): string {
    return this._message;
  }
}
