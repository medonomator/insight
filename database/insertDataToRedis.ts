import { aphorisms } from './schemas/aphorisms';
import { redisClient } from './redis';
import { logger } from '../helpers/logger';

export const insertDataToRedis = async () => {
  try {
    const weMongoIds = await redisClient.exists('mongoIds');

    if (!weMongoIds) {
      const data = (await aphorisms
        .find({})
        .select('-__v -createdAt -updatedAt')
        .sort({ createdAt: -1 })
        .lean()) as any;

      const prepareToWriteRedis = {};
      data.map(item => {
        prepareToWriteRedis[item._id.toString()] = JSON.stringify(item);
      });

      await redisClient.hmset('mongoIds', prepareToWriteRedis);
      await redisClient.expair('mongoIds', Infinity);
      logger.info('MongoIds recorded in the database');
    }
  } catch (error) {
    logger.error(error);
  }
};
