import * as jwt from 'jsonwebtoken';
import { logger } from '../../helpers/logger';
import { TOKEN_SIGN_KEY } from '../../config';
import { knex } from '../../database/pgConnect';

export default async function tokenStrategy(request, token: string) {
  try {
    const userId = await new Promise((resolve, reject) => {
      jwt.verify(token, TOKEN_SIGN_KEY, (err: Error, decoded) => {
        if (err || !decoded) {
          reject(err.message);
          return;
        }
        resolve(decoded.id);
      });
    });
    if (!userId) {
      return { isValid: false, credentials: {} };
    }

    const credentials = await knex('users').where('id', userId);
    return { isValid: true, credentials };
  } catch (error) {
    logger.error(error);
    return { isValid: false, credentials: {} };
  }
}
