import * as jsonwebtoken from 'jsonwebtoken';
import * as crypto from 'crypto';

interface ITokens {
  token: string;
  refreshToken: string;
}

interface IPrepareTokensParams {
  userId: string;
  email: string;
}

export const prepareTokens = (obj: IPrepareTokensParams): ITokens => {
  const tokenExpirationSeconds = 60 * 60 * 24; // 1 day
  const refreshTokenExpirationSeconds = 60 * 60 * 24 * 7; // week

  return {
    token: jsonwebtoken.sign(
      {
        userId: obj.userId,
        email: obj.email,
      },
      <string>process.env.TOKEN_SIGN_KEY || 'NeverShareYourSecret',
      {
        algorithm: 'HS256',
        expiresIn: tokenExpirationSeconds,
      },
    ),
    refreshToken: jsonwebtoken.sign(
      {
        userId: obj.userId,
        refresh: true,
      },
      <string>process.env.REFRESH_TOKEN_SIGN_KEY || 'NeverShareYourSecret',
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
}
