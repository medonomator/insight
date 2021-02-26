import { logger } from "../helpers/logger";
import cron from "node-cron";
import { aphorisms } from "../database/schemas/aphorisms";
import VkApi from "../helpers/vkApi";
import { globalPostInfoToTelegramBot } from "./globalPostInfoToTelegramBot";

export const cronJobRunner = async () => {
  try {
    cron.schedule("*/180 * * * *", async () => {
      const aphorism = await aphorisms.findOne({ vkPosted: false }).lean();

      if (!aphorism) {
        await aphorisms.update({}, { vkPosted: false }, { multi: true });
      }

      await VkApi.wallPost(`${aphorism.body} (${aphorism.authorName})`);

      await aphorisms.update({ _id: aphorism._id }, { vkPosted: true });
    });
    
    cron.schedule("*/360 * * * *", async () => {
      await globalPostInfoToTelegramBot();
    });
    logger.info("All Jobs are running");
  } catch (error) {
    logger.error(error);
  }
};
