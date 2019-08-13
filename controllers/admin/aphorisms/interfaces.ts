/**
 * GRUD for aphorisms
 */
export interface IParamsCreate {
  payload: {
    author: string;
    body: string;
    tags?: string[];
  };
}

export interface IParamsUpdate {}
export interface IParamsDelete {}
export interface IResponse {}

