import axios from 'axios';
import { logger } from '../helpers/logger';
import { insertDataToRedis } from '../database/insertDataToRedis';
import { telegramSendMessage } from './telegramBotLauncher';
import { isEmpty } from 'lodash';

const TIMELIFE_REQUEST = 1000 * 30; // 30 second
const TIME_UPDATE_CHECKER = 1000 * 60 * 3; //  3 minute

export const serverHelthCheck = () => {
  setInterval(async () => {
    try {
      await axios.get('http://83.166.242.213/', {
        timeout: TIMELIFE_REQUEST,
      });

      const res = await axios.get('http://83.166.242.213/admin/aphorisms');

      if (isEmpty(res.data)) {
        await insertDataToRedis();
        telegramSendMessage('Update data in redis');
      } else {
        logger.info('Without failures');
      }
    } catch (err) {
      telegramSendMessage('Website not response!');
      // telegramBot.sendMessage(BOT_ID, 'restart docker-compose');
      // const ls = spawn('docker-compose', ['restart mongo']);
      logger.error(err);
    }
  }, TIME_UPDATE_CHECKER);
};
