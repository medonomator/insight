import { aphorisms } from './schemas/aphorisms';
import { redisClient } from './redis';
import { logger } from '../helpers/logger';

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

export const insertDataToRedis = async () => {
  try {
    const isMongoIds = await redisClient.exists('mongoIds');
    if (!isMongoIds) {
      const data: any = await aphorisms
        .find()
        .select('-__v -createdAt -updatedAt')
        .sort({ createdAt: -1 })
        .lean();

      const prepareToWriteRedis = {};
      data.map(item => {
        prepareToWriteRedis[item._id.toString()] = JSON.stringify(item);
      });

      await redisClient.hmset('mongoIds', prepareToWriteRedis);
      await redisClient.expire('mongoIds', ONE_YEAR);
      logger.info('MongoIds recorded in the database');
    }
  } catch (error) {
    logger.error(error);
  }
};
