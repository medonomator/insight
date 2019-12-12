/**
 * Customer entry in LC
 * In response are returned tokens if the credentials are correct
 */
export interface IParams {
  payload: {
    email: string;
    password: string;
  };
}

export interface IResponse {
  token: string;
  refreshToken: string;
}
