import * as uuid from 'uuid';
import Boom from 'boom';
import { users } from '../../../database/schemas/users';
import { logger } from '../../../helpers/logger';
import { encryptData } from '../../../helpers';
import { prepareTokens } from '../../../helpers/index';
import { IParams, IResponse } from './interfaces';

export const userRegister = async (req: IParams): Promise<IResponse | Boom> => {
  try {
    const { email, password, name } = req.payload;
    const oldUser = await users.findOne({ email }).lean();

    if (oldUser) {
      return Boom.badRequest(`the user >>> ${email} <<< is already in the system`);
    }

    const userId = uuid.v4();
    const payload = {
      userId,
      email,
      password: encryptData(password, email.toLowerCase()),
      name,
    };

    const newUser = await users.create(payload);
    logger.info(`NewUser with Email: ${newUser['email']} and Name: ${newUser['name']} was created`);
    return prepareTokens(payload);
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
