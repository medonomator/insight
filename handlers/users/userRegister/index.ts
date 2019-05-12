import * as Hapi from 'hapi';
import * as db from '../../../database/schemas';
import * as uuid from 'uuid';
import logger from '../../../helpers/logger';
import { encryptData } from '../../../helpers';
import { ErrorStatus, default as Error } from '../../../helpers/error';
import { prepareTokens } from '../../../helpers/index';
import { IParams, IUser } from './interfaces';

import { testSchema } from '../../../database/schemas/testSchema';

// testSchema
//   .find({ age: { $gt: 10 } })
//   .setOptions({ explain: 'executionStats' })
//   .then(res => {
//     console.log(res);
//   });

export const userRegister = async (req: IParams) => {
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
      password: encryptData(password, email.toLowerCase()),
      name,
    };

    const newUser = new db.usersSchema(payload);
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

// var start = new Date();
// var hrstart = process.hrtime();
// var simulateTime = 5;

// setTimeout(function(argument) {
//   // execution time simulated with setTimeout function
//   var end = new Date() - start,
//     hrend = process.hrtime(hrstart);

//   console.info('Execution time: %dms', end);
//   console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
// }, simulateTime);
