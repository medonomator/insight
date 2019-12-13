import * as jwt from 'jsonwebtoken';
import { logger } from '../../helpers/logger';
import { users } from '../../database/schemas/users';
import { TOKEN_SIGN_KEY } from '../../config';

export default async function tokenStrategy(request, token: string) {
  try {
    const userId = await new Promise((resolve, reject) => {
      jwt.verify(token, TOKEN_SIGN_KEY, (err: Error, decoded) => {
        if (err || !decoded) {
          reject(err.message);
          return;
        }
        resolve(decoded.userId);
      });
    });
    if (!userId) {
      return { isValid: false, credentials: {} };
    }

    const credentials = await users.findOne({ userId });
    return { isValid: true, credentials };
  } catch (error) {
    logger.error(error);
    return { isValid: false, credentials: {} };
  }
}
