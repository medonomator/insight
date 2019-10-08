import { RedisClient } from 'redis';

var redis = require('redis'),
  redisClient: RedisClient = redis.createClient();

export default redisClient;
