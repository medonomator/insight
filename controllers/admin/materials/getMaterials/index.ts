import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IResponse, IMaterials } from "../interfaces";
import { knex } from "../../../../database/pgConnect";
import materialsTable from "../../../../tables/materials";

/**
 * Get Materials
 * @return {Promise<IResponse>}>
 */
export const getMaterials = async (): Promise<IResponse> => {
  try {
    const data: IMaterials[] = await knex(materialsTable.table);
    logger.info("Get Materials");
    return { data, count: data.length };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
