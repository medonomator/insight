import * as Hapi from 'hapi';
import { users } from '../../../database/schemas/users';
import * as uuid from 'uuid';
import { logger } from '../../../helpers/logger';
import { encryptData } from '../../../helpers';
import { ErrorCode } from '../../../interfaces';
import SystemError from '../../../helpers/systemError';
import { prepareTokens } from '../../../helpers/index';
import { IParams, ResMongoUser } from './interfaces';

export const userRegister = async (req: IParams) => {
  try {
    const { email, password, name } = req.payload;
    const oldUser = <ResMongoUser>await users.findOne({ email });
    if (oldUser) {
      return {
        error: {
          code: ErrorCode.BAD_REQUEST,
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

    const newUser = await users.create(payload);
    if (!newUser) {
      throw new SystemError({
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Произошла ошибка на сервере при создании пользователя',
      });
    }

    logger.info(`NewUser with Email: ${newUser['email']} and Name: ${newUser['name']} was created`);
    return { ...prepareTokens(payload) };
  } catch (err) {
    logger.error(err);
    return {
      code: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};
