import * as asyncRedis from 'async-redis';
import { IAphorisms } from '../controllers/admin/aphorisms/interfaces';
import { logger } from '../helpers/logger';

export const redisClient = asyncRedis.createClient();
const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

redisClient.on('connect', function() {
  logger.info('Redis connected');
});
redisClient.on('error', function(err) {
  logger.error('Connect Redis Error ' + err);
});

export const getAllElementsByKey = async (key: string): Promise<IAphorisms[]> => {
  const arrayForFilling: IAphorisms[] = [];
  Object.values(await redisClient.hgetall(key)).forEach((item: string) => {
    arrayForFilling.push(JSON.parse(item));
  });
  return arrayForFilling;
};

//  I dont know how to remove the element from array from redis so i write this stuff...
export const deleteElement = async (key: string, _id: string) => {
  try {
    let allElements = await getAllElementsByKey(key);
    allElements = allElements.filter(item => item._id !== _id);

    const prepareToWriteRedis = {};
    allElements.map(item => {
      prepareToWriteRedis[item._id.toString()] = JSON.stringify(item);
    });

    await redisClient.del('mongoIds');
    await redisClient.hmset('mongoIds', prepareToWriteRedis);
    await redisClient.expire('mongoIds', ONE_YEAR);
  } catch (error) {
    logger.error(error);
  }
};
