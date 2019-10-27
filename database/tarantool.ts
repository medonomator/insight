import * as TarantoolConnection from 'tarantool-driver';

export const conn = new TarantoolConnection({
  port: 3344,
  username: 'superuser',
});

conn.on('connect', (err, res) => {
  console.log('=============================');
  console.log('logging', err);
  console.log('logging', res);
  console.log('=============================');
});
