import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IResponse, IMaterials } from "../interfaces";
import { materials } from "../../../../database/schemas/materials";
/**
 * Get Materials
 * @return {Promise<IResponse>}>
 */
export const getMaterials = async (): Promise<IResponse> => {
  try {
    logger.info("Get Materials");

    const data: IMaterials[] = await materials.find().lean();
    const count = await materials.countDocuments();

    return { data, count };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
