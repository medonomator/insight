import * as Hapi from 'hapi';
import { users } from '../../../database/schemas/users';
import * as uuid from 'uuid';
import { logger } from '../../../helpers/logger';
import { encryptData } from '../../../helpers';
import { ErrorStatus, default as Error } from '../../../helpers/error';
import { prepareTokens } from '../../../helpers/index';
import { IParams, IUser } from './interfaces';

export const userRegister = async (req: IParams) => {
  try {
    const { email, password, name } = req.payload;
    const oldUser: IUser | null = <any>await users.findOne({ email });

    if (oldUser) {
      return {
        error: {
          status: ErrorStatus.badRequest,
          message: `Пользователь с логином ${email} уже зарегистрирован в системе`,
        },
      };
    }

    const userId = uuid.v4();
    const payload = {
      userId,
      email,
      password: encryptData(password, email.toLowerCase()),
      name,
    };

    const newUser = new users(payload);
    newUser.save().then(() => {
      logger.info('New user registered', payload);
    });

    if (!newUser) {
      throw new Error({
        status: ErrorStatus.internalServerError,
        message: 'Произошла ошибка на сервере при создании пользователя',
      });
    }

    return {
      error: null,
      userId,
      ...prepareTokens(payload),
    };
  } catch (err) {
    logger.error(err);
    return {
      error: {
        status: err.status || ErrorStatus.internalServerError,
        message: err.message,
        data: err.data || {},
      },
    };
  }
};
