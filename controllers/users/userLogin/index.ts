import * as Hapi from 'hapi';
import Boom from 'boom';
import { users } from '../../../database/schemas/users';
import { logger } from '../../../helpers/logger';
import { ErrorCode } from '../../../interfaces';
import { prepareTokens } from '../../../helpers/index';
import { encryptData } from '../../../helpers';
import { IParams, IUserType, IUser } from './interfaces';

export const userLogin = async (req: IParams, h: Hapi.ResponseToolkit) => {
  try {
    const { email, password } = req.payload;
    const resUser: IUserType = <IUserType>await users.findOne({ email }).lean();

    if (!resUser || resUser.password !== encryptData(password, email.toLowerCase())) {
      return Boom.badRequest('Неверный логин или пароль');
    }

    logger.info('Client successfully logged in, clientId=', resUser.userId);
    return {
      error: null,
      ...prepareTokens(resUser),
    };
  } catch (err) {
    logger.error(err);
    return {
      error: {
        status: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
        message: err.message,
      },
    };
  }
};
