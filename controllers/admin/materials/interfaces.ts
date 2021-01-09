import Boom from 'boom';
import { IItemNameMachine } from '../../../interfaces';
/**
 * GRUD for materials
 */
export interface IMaterials {
  _id: string;
  name: string;
  description: string;
  tags: IItemNameMachine[];
  websiteUrl?: string;
  youtubeUrl?: string;
  audioBooks?: string;
  books?: string;
}

export interface IParamsCreate {
  payload: {
    name: string;
    description: string;
    tags?: string[];
    websiteUrl?: string;
    youtubeUrl?: string;
    audioBooks?: string;
    books?: string;
  };
}

export interface IParamsUpdate {
  payload: IMaterials;
}

export interface IParamsDelete {
  payload: {
    _id: string;
  };
}

export interface IResponseIMaterials {
  data: IMaterials[],
  count: number
}

export type IResponse = IResponseIMaterials | Boom | 'ok';
