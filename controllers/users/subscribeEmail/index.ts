import Boom from 'boom';
import { logger } from '../../../helpers/logger';
import { IParams, IResponse } from './interfaces';

export const subscribeEmail = async (req: IParams): Promise<IResponse | Boom> => {
  try {
    const { email } = req.payload;

    console.log('=============================');
    console.log('logging', 'HERE');
    console.log('=============================');

    // logger.info('Client successfully logged in, userId >>>', resUser.userId);
    return 'ok' as any;
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
