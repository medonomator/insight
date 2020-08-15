import Boom from "boom";
import { IItemNameMachine } from "../../../interfaces";
import { IAphorisms } from "../../../interfaces/aphorism";

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
    random?: boolean;
  };
}

export interface IParamsUpdate {
  payload: IAphorisms;
}

export interface IParamsDelete {
  payload: {
    id: string;
  };
}

export interface IResponseGetAphorisms {
  data: IAphorisms[];
  count: number;
  categories?: IItemNameMachine[];
  authors?: IItemNameMachine[];
}

export type IResponse = IAphorisms | IResponseGetAphorisms | Boom | "ok";
