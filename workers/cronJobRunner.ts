import { logger } from "../helpers/logger";
import cron from "node-cron";
import { getVkToken } from "../helpers/getVkToken";
import axios from "axios";
import { aphorisms } from "../database/schemas/aphorisms";
import VkApi from "../helpers/vkApi";

export const cronJobRunner = async () => {
  try {
    cron.schedule("*/60 * * * *", async () => {
      // const aphorism = await aphorisms.findOne({ vkPosted: false }).lean();

      // if (!aphorism) {
      //   await aphorisms.update({}, { vkPosted: false }, { multi: true });
      // }
      const aphorism: any = {};

      aphorism.body = "<p>Text</p><br/><p>Text</p>";
      await VkApi.wallPost(aphorism.body);

      await aphorisms.update({ _id: aphorism._id }, { vkPosted: true });
    });
    logger.info("All Jobs are running");
  } catch (error) {
    logger.error(error);
  }
};
