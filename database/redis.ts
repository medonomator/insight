import * as asyncRedis from "async-redis";
import * as redis from 'redis';
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
