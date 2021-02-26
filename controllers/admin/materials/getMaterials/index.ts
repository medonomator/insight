import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IResponse, IMaterials } from "../interfaces";
import { materials } from '../../../../database/schemas/materials'

/**
 * Get Materials
 * @return {Promise<IResponse>}>
 */
export const getMaterials = async (): Promise<IResponse> => {
  try {
    const data: IMaterials[] = await materials.find().lean();

    logger.info("Get Materials");
    return { data, count: data.length };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
