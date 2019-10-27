import * as asyncRedis from 'async-redis';

export const redisClient = asyncRedis.createClient();

redisClient.on('connect', function() {
  console.log('connected');
});
redisClient.on('error', function(err) {
  console.log('Connect Redis Error ' + err);
});
