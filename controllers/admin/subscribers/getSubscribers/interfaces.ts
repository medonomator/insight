import Boom from "boom";

export interface ISubscriber {
  id: string;
  email: string;
  created_at: string;
}

export interface IResponseGetSubscrubers {
  data: ISubscriber[];
  count: number;
}

export type IResponse = IResponseGetSubscrubers | Boom;
