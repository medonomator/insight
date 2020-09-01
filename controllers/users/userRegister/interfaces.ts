export interface IParams {
  payload: {
    email: string;
    password: string;
    name: string;
  };
}

export interface IUser {
  id: string;
  email: string;
  password: string;
  name?: string;
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

export interface IResponse {
  token: string;
  refreshToken: string;
}

