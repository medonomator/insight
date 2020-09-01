import Boom from 'boom';
import { logger } from '../../../helpers/logger';
import { prepareTokens } from '../../../helpers/index';
import { encryptData } from '../../../helpers';
import { IParams, IResponse } from './interfaces';
import { IUser } from '../userRegister/interfaces';
import { knex } from '../../../database/pgConnect';

export const userLogin = async (req: IParams): Promise<IResponse | Boom> => {
  try {
    const { email, password } = req.payload;
    const resUser: IUser | null = await knex('users').where({ email }).first()

    if (!resUser || resUser.password !== encryptData(password, email.toLowerCase())) {
      return Boom.badRequest('Invalid login or password');
    }

    logger.info('Client successfully logged in', resUser);
    return prepareTokens(resUser);
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
