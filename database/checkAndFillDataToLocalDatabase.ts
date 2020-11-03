import axios from "axios";
import { logger } from "../helpers/logger";
import { knex } from "./pgConnect";
import materialsTable from "../tables/materials";
import { MAIN_HOST_URL } from "../constants";

export const checkAndFillDataToLocalDatabase = async (): Promise<void> => {
  try {
    const materials = await knex(materialsTable.table);

    if (!materials.length) {
      const materials = await axios.get(`${MAIN_HOST_URL}v1/admin/materials`);

      materials.data.data.forEach((item) => {
        item.tags = JSON.stringify(item.tags);
      });

      await knex(materialsTable.table).insert(materials.data.data);

      logger.info("Insert meterials to local Database complete");
    }
  } catch (error) {
    logger.error(error);
  }
};
