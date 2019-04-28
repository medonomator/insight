import * as Hapi from 'hapi';
import * as db from '../../../database/schemas';
import * as crypto from 'crypto';
import * as uuid from 'uuid';
import * as Logger from 'pino';
import { ErrorStatus, default as Error } from '../../../helpers/error';
import { IUser } from './interfaces';
import { prepareTokens } from '../../../helpers/index';
const logger = Logger();

export const userRegister = async (req, h: Hapi.ResponseToolkit) => {
  try {
    const { email, password, name } = req.payload;
    const oldUser: IUser | null = <any>await db.usersSchema.findOne({ email });

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
      password: encrypt(password, email.toLowerCase()),
      name,
    };

    const newUser = new db.usersSchema(payload);

    newUser.save().then(() => {
      logger.info('New user registered', {});
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
      ...prepareTokens(payload)
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

function encrypt(str: string, secretKey = 'secretKey') {
  return crypto
    .createHmac('sha256', secretKey)
    .update(str)
    .digest('hex');
}
