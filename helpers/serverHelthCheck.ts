import os from 'os';
import axios from 'axios';
import { spawn } from 'child_process';
import { logger } from '../helpers/logger';
import { redisClient } from '../database/redis';

// testing right hostname
console.log('=============================');
console.log('logging', os.hostname());
console.log('=============================');

const TIMELIFE_REQUEST = 10000;
const TIME_UPDATE_CHECKER = 1000 * 10 * 60; //  1 minute

const restartDockerCompose = () => {
  const ls = spawn('docker-compose', ['restart']);
  ls.stdout.on('data', data => logger.info(`stdout: ${data}`));
  ls.stderr.on('data', data => logger.error(`stderr: ${data}`));
  ls.on('close', code => logger.info(`child process exited with code ${code}`));
};

export const serverHelthCheck = () => {
  setInterval(async () => {
    try {
      await axios('http://familyzorins.tk/', {
        timeout: TIMELIFE_REQUEST,
      });

      const isMongoIds = await redisClient.exists('mongoIds');

      if (!isMongoIds) {
        restartDockerCompose();
      }
    } catch (err) {
      restartDockerCompose();
      logger.error(err);
    }
  }, TIME_UPDATE_CHECKER);
};
