import * as Hapi from 'hapi';
import * as db from '../../../database/schemas';
import logger from '../../../helpers/logger'
import { ErrorStatus, default as Error } from '../../../helpers/error';
import { prepareTokens } from '../../../helpers/index';
import { encryptData } from '../../../helpers';
import { IParams, IUser } from './interfaces';

export const userLogin = async (req: IParams, h: Hapi.ResponseToolkit) => {
  try {
    const { email, password } = req.payload;
    const client: IUser | null = <any>await db.usersSchema.findOne({ email });

    if (!client || client.password !== encryptData(password, email.toLowerCase())) {
      throw new Error({
        status: ErrorStatus.internalServerError,
        message: 'Неверный логин или пароль',
      });
    }

    logger.info('Client successfully logged in, clientId=', client.userId);
    return {
      error: null,
      ...prepareTokens(client)
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
