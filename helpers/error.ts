import { ErrorStatus, IError } from '../interfaces';

export default class Error implements IError {
  public status: ErrorStatus;
  public message: string;
  public constructor(error: IError) {
    this.status = error.status;
    this.message = error.message;
  }

  public getStatus(): ErrorStatus {
    return this.status;
  }

  public getMessage(): string {
    return this.message;
  }
}
