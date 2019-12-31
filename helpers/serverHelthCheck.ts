import axios from 'axios';
import { spawn } from 'child_process';
import { logger } from '../helpers/logger';
import { insertDataToRedis } from '../database/insertDataToRedis';
import TelegramBot from './telegramBotLauncher';
import { isEmpty } from 'lodash';

const TIMELIFE_REQUEST = 1000 * 30; // 30 second
const TIME_UPDATE_CHECKER = 1000 * 60 * 3; //  3 minute
const BOT_ID = '409011202';

const telegramBot = new TelegramBot();
telegramBot.launch();
telegramBot.sendMessage(BOT_ID, 'update data in redis');
export const serverHelthCheck = () => {
  setInterval(async () => {
    try {
      await axios.get('http://134.209.163.196/', {
        timeout: TIMELIFE_REQUEST,
      });

      const res = await axios.get('http://familyzorins.tk/admin/aphorisms');

      if (isEmpty(res.data)) {
        await insertDataToRedis();
        telegramBot.sendMessage(BOT_ID, 'update data in redis');
      } else {
        logger.info('Without failures');
      }
    } catch (err) {
      telegramBot.sendMessage(BOT_ID, 'Again silent...');
      // telegramBot.sendMessage(BOT_ID, 'restart docker-compose');
      // const ls = spawn('docker-compose', ['restart mongo']);
      // ls.stdout.on('data', data => logger.info(`stdout: ${data}`));
      // ls.stderr.on('data', data => logger.error(`stderr: ${data}`));
      // ls.on('close', code => logger.info(`child process exited with code ${code}`));
      // logger.error(err);
    }
  }, TIME_UPDATE_CHECKER);
};
