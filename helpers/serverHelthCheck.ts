import os from 'os';
import axios from 'axios';
import { spawn } from 'child_process';
import { logger } from '../helpers/logger';
import { insertDataToRedis } from '../database/insertDataToRedis';
import TelegramBot from './telegramBotLauncher';

const TIMELIFE_REQUEST = 10000;
const TIME_UPDATE_CHECKER = 1000 * 10 * 60; //  1 minute
const HOST_NAME = process.env.NODE_ENV === 'development' ? 'http://familyzorins.tk/' : os.hostname();
const BOT_ID = '409011202';

const telegramBot = new TelegramBot();
telegramBot.launch();

export const serverHelthCheck = () => {
  setInterval(async () => {
    try {
      await axios(HOST_NAME, {
        timeout: TIMELIFE_REQUEST,
      });

      const res = await axios(`${HOST_NAME}/admin/aphorisms`, {
        timeout: TIMELIFE_REQUEST,
      });

      if (!res.data.length) {
        await insertDataToRedis();
        telegramBot.sendMessage(BOT_ID, 'update data in redis');
      }
    } catch (err) {
      telegramBot.sendMessage(BOT_ID, 'restart docker-compose');
      const ls = spawn('docker-compose', ['restart']);
      ls.stdout.on('data', data => logger.info(`stdout: ${data}`));
      ls.stderr.on('data', data => logger.error(`stderr: ${data}`));
      ls.on('close', code => logger.info(`child process exited with code ${code}`));
      logger.error(err);
    }
  }, TIME_UPDATE_CHECKER);
};
