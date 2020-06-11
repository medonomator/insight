import * as asyncRedis from "async-redis";
import * as redis from 'redis';
// import { IAphorisms } from '../controllers/admin/aphorisms/interfaces';
import { logger } from "../helpers/logger";

export const redisClient = asyncRedis.createClient({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || "6379",
});

redisClient.on("connect", function () {
  logger.info("Redis connected");
});
redisClient.on("error", function (err) {
  logger.error("Connect Redis Error " + err);
});

// export const getAllElementsByKey = async (key: string): Promise<IAphorisms[]> => {
//   const arrayForFilling: IAphorisms[] = [];
//   Object.values(await redisClient.hgetall(key)).forEach((item: string) => {
//     arrayForFilling.push(JSON.parse(item));
//   });
//   return arrayForFilling;
// };

// //  I dont know how to remove the element from array from redis so i write this stuff...
// export const deleteElement = async (key: string, _id: string): Promise<void> => {
//   try {
//     let allElements = await getAllElementsByKey(key);
//     allElements = allElements.filter(item => item._id !== _id);

//     const prepareToWriteRedis = {};
//     allElements.map(item => {
//       prepareToWriteRedis[item._id.toString()] = JSON.stringify(item);
//     });

//     await redisClient.del('mongoIds');
//     await redisClient.hmset('mongoIds', prepareToWriteRedis);
//   } catch (error) {
//     logger.error(error);
//   }
// };
