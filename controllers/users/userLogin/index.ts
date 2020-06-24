import Boom from 'boom';
import { users } from '../../../database/schemas/users';
import { logger } from '../../../helpers/logger';
import { prepareTokens } from '../../../helpers/index';
import { encryptData } from '../../../helpers';
import { IParams, IResponse } from './interfaces';
import { IUser } from '../userRegister/interfaces';

export const userLogin = async (req: IParams): Promise<IResponse | Boom> => {
  try {
    const { email, password } = req.payload;
    const resUser: IUser | null = await users.findOne({ email }).lean();

    if (!resUser || resUser.password !== encryptData(password, email.toLowerCase())) {
      return Boom.badRequest('Invalid login or password');
    }

    logger.info('Client successfully logged in, userId >>>', resUser.userId);
    return prepareTokens(resUser);
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
