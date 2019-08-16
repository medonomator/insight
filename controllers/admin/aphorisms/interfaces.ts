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

export interface IParamsUpdate {
  payload: {
    _id: string;
    author: string;
    body: string;
    tags: string[];
  };
}
export interface IParamsDelete {}
export interface IResponse {}
