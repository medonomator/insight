import { logger } from "../helpers/logger";
import cron from "node-cron";
import { aphorisms } from "../database/schemas/aphorisms";
import VkApi from "../helpers/vkApi";
import { globalPostInfoToTelegramBot } from "./globalPostInfoToTelegramBot";
import TelegramSendMessage from "../helpers/telegramBotLauncher";
import { APHORISM_CHANNEL_ID, MAIN_BOT_ID } from "../constants";

export const cronJobRunner = async () => {
  try {
    cron.schedule("0 9,12,15,18,21 * * *", async () => {
      let aphorism: any = {};
      aphorism = await aphorisms.findOne({ vkPosted: false }).lean();

      if (!aphorism) {
        await aphorisms.update({}, { vkPosted: false }, { multi: true });
        aphorism = await aphorisms.findOne({ vkPosted: false }).lean();
      }


      const aphorismText = `${aphorism.body.replace(/\./g, '\\.').replace(/-/g, '\\-')} \n\n✏️ *${aphorism.authorName.replace(/\./g, '\\.')}*`;

      TelegramSendMessage(aphorismText, APHORISM_CHANNEL_ID);

      if (encodeURIComponent(aphorismText).length < 1000) {
        await VkApi.wallPost(aphorismText);
      }

      await aphorisms.update({ _id: aphorism._id }, { vkPosted: true });
    });

    cron.schedule("0 */6 * * *", async () => {
      await globalPostInfoToTelegramBot();
    });
    logger.info("All Jobs are running");
  } catch (error) {
    logger.error(error);
  }
};
