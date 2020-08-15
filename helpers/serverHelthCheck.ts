import axios from "axios";
import { logger } from "../helpers/logger";
import { insertDataToRedis } from "../database/insertDataToRedis";
import TelegramBot from "./telegramBotLauncher";
import { MAIN_HOST_URL } from "../constants";

const TIMELIFE_REQUEST = 1000 * 30; // 30 second
const TIME_UPDATE_CHECKER = 1000 * 60 * 3; //  3 minute

export const serverHelthCheck = () => {
  setInterval(async () => {
    try {
      const res = await axios.get(`${MAIN_HOST_URL}admin/aphorisms`, {
        timeout: TIMELIFE_REQUEST,
      });

      if (!res.data.length) {
        await insertDataToRedis();
        TelegramBot.sendMessage("Update data in redis");
      } else {
        logger.info("Without failures");
      }
    } catch (err) {
      TelegramBot.sendMessage("Website not response!");
      logger.error(err);
    }
  }, TIME_UPDATE_CHECKER);
};
