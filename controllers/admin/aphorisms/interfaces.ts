import { IError } from '../../../interfaces';
/**
 * GRUD for aphorisms
 */
export interface IAphorisms {
  _id: string;
  author: string;
  body: string;
  tags: Array<{
    _id: string;
    name: string;
    machineName: string;
  }>;
}

export interface IParamsCreate {
  payload: {
    author: string;
    body: string;
    tags?: string[];
  };
}

export interface IParamsUpdate {
  payload: IAphorisms;
}
export interface IParamsDelete {
  payload: {
    _id: string;
  };
}

export interface IResponseAphorisms {
  data: IAphorisms[];
  count: number;
}

export interface IResponseCreate {
  _id: string
}

export type IResponse = IError | 'ok' | IResponseCreate;
export type IGetResponseAphorisms = IError | IResponseAphorisms;
