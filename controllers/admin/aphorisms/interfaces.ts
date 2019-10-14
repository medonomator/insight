import { IError } from '../../../interfaces';
/**
 * GRUD for aphorisms
 */
export interface ICategories {
  _id: string;
  name: string;
  machineName: string;
}

export interface IAuthors {
  _id: string;
  name: string;
  machineName: string;
}

export interface IAphorisms {
  _id: string;
  author: string;
  body: string;
  tags: ICategories[];
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

export interface IParamsGet {
  query: {
    limit?: number;
    offset?: number;
    category?: string;
    topic?: string;
    author?: string;
    body?: string;
    isAdmin?: boolean;
  };
}

export interface IResponseAphorisms {
  data: IAphorisms[];
  count: number;
  categories?: ICategories[];
  authors?: IAuthors[];
}

export interface IResponseCreate {
  _id: string;
}

export type IResponse = IError | 'ok' | IResponseCreate;
export type IGetResponseAphorisms = IError | IResponseAphorisms;
