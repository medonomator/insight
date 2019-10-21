var redis = require('redis');

const redisConnection = () => {
  const client = redis.createClient();

  client.on('error', function(err) {
    console.log('Connect Redis Error ' + err);
  });

  client.on('connect', function() {
    console.log('Redis connected');
  });

  return client;
};

export default redisConnection;
