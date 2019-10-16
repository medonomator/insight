/**
 * Вход клиента в ЛК
 * В ответ возвращаются токены, если credentials верные
 */

export interface IParams {
  payload: {
    email: string;
    password: string;
  };
}

export interface IUser {
  email: string;
  password: string;
  userId: string;
  name: string;
  _id: string;
  birthDate: string;
  sex: string;
  regDate: Date;
  about: string;
  interests: string;
  activity: string;
  city: string;
  status: string;
  role: string;
  age: number | null;
  avatarUrl: string;
}

export type IUserType = IUser | null;
