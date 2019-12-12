import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { TOKEN_SIGN_KEY, REFRESH_TOKEN_SIGN_KEY } from '../config';
const CyrToLat = require('cyrillic-to-translit-js');

interface ITokens {
  token: string;
  refreshToken: string;
}

interface IPrepareTokensParams {
  userId: string;
  email: string;
}

export const prepareTokens = (obj: IPrepareTokensParams): ITokens => {
  const tokenExpirationSeconds = 60 * 60 * 24 * 7; // make 1 week temporary for testing
  const refreshTokenExpirationSeconds = 60 * 60 * 24 * 7; // week

  return {
    token: jwt.sign(
      {
        userId: obj.userId,
        email: obj.email,
        tokenSignKey: TOKEN_SIGN_KEY,
      },
      TOKEN_SIGN_KEY,
      {
        algorithm: 'HS256',
        expiresIn: tokenExpirationSeconds,
      },
    ),
    refreshToken: jwt.sign(
      {
        userId: obj.userId,
        refresh: true,
        tokenSignKey: REFRESH_TOKEN_SIGN_KEY,
      },
      REFRESH_TOKEN_SIGN_KEY,
      {
        algorithm: 'HS256',
        expiresIn: Math.floor(tokenExpirationSeconds + refreshTokenExpirationSeconds),
      },
    ),
  };
};

export const encryptData = (str: string, secretKey = 'secretKey') => {
  return crypto
    .createHmac('sha256', secretKey)
    .update(str)
    .digest('hex');
};

export const cyrToLat = (symbols: string) => {
  return new CyrToLat()
    .transform(symbols)
    .replace("'", '')
    .replace(',', '')
    .replace(/ /g, '');
};
