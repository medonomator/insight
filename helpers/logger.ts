const pino = require('pino');

export const logger = pino({
  prettyPrint: { colorize: true },
});
