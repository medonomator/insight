import Boom from 'boom';
import { IItemNameMachine } from '../../../interfaces';
/**
 * GRUD for aphorisms
 */
export interface IAphorisms {
  _id: string;
  author: string;
  body: string;
  tags: IItemNameMachine[];
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IResTakeAphorisms {
  aphorisms: IAphorisms[];
  count: number;
}

export interface IParamsCreate {
  payload: {
    author: string;
    body: string;
    tags?: string[];
    category: string;
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

export interface IParamsUpdate {
  payload: IAphorisms;
}

export interface IParamsDelete {
  payload: {
    _id: string;
  };
}

export interface IResponseGetAphorisms {
  data: IAphorisms[];
  count: number;
  categories?: IItemNameMachine[];
  authors?: IItemNameMachine[];
}

export type IResponse = IAphorisms | IResponseGetAphorisms | Boom | 'ok';
