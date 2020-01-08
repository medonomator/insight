import axios from 'axios';
import { logger } from '../helpers/logger';
import { insertDataToRedis } from '../database/insertDataToRedis';
import TelegramBot from './telegramBotLauncher';
import { isEmpty } from 'lodash';
import { MAIN_HOST_URL } from '../constants';

const TIMELIFE_REQUEST = 1000 * 30; // 30 second
const TIME_UPDATE_CHECKER = 1000 * 60 * 3; //  3 minute

export const serverHelthCheck = () => {
  setInterval(async () => {
    try {
      await axios.get(MAIN_HOST_URL, {
        timeout: TIMELIFE_REQUEST,
      });

      const res = await axios.get(`${MAIN_HOST_URL}admin/aphorisms`);

      if (isEmpty(res.data)) {
        await insertDataToRedis();
        TelegramBot.sendMessage('Update data in redis');
      } else {
        logger.info('Without failures');
      }
    } catch (err) {
      TelegramBot.sendMessage('Website not response!');
      logger.error(err);
    }
  }, TIME_UPDATE_CHECKER);
};
