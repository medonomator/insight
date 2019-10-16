import * as Hapi from 'hapi';
import * as jwt from 'jsonwebtoken';
import { logger } from '../../helpers/logger';
import { users } from '../../database/schemas/users';
import { TOKEN_SIGN_KEY } from '../../config';

export default async function tokenStrategy(request: Hapi.Request, token: string, h: Hapi.ResponseToolkit) {
  const userId = await new Promise((resolve, reject) => {
    jwt.verify(token, TOKEN_SIGN_KEY, (err, decoded) => {
      if (err || !decoded.userId) {
        logger.error('Invalid token');
        reject(false);
      }
      resolve(decoded.userId);
    });
  });

  if (!userId) {
    return { isValid: false, credentials: {} };
  }
  const resUser = await users.findOne({ userId });
  if (!resUser) {
    return { isValid: false, credentials: {} };
  }
  return { isValid: true, credentials: resUser };
}
