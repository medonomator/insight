import axios from "axios";
import { logger } from "../helpers/logger";
import materialsTable from "../tables/materials";
import { MAIN_HOST_URL } from "../constants";
import { aphorisms } from '../database/schemas/aphorisms'

export const checkAndFillDataToLocalDatabase = async (): Promise<void> => {
  try {
    const aphorismsData = await aphorisms.find().lean().limit(1);

    console.log('======================================================');
    console.dir(aphorismsData, { depth: null });
    console.log('======================================================');
    throw new Error('Error')
    if (!aphorismsData.length) {
      const aphorismsData = await axios.get(`${MAIN_HOST_URL}v1/admin/materials`);

      aphorismsData.data.data.forEach((item) => {
        item.tags = JSON.stringify(item.tags);
      });

      await aphorisms.insertMany(aphorismsData.data.data);

      logger.info("Insert meterials to local Database complete");
    }
  } catch (error) {
    logger.error(error);
  }
};
