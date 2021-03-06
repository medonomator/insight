import { logger } from "../../helpers/logger";
import Boom from "boom";
import { writeFile } from "../../helpers/workingWithFIles";
import faker from "faker";
/**
 * Put on file to static/temp folder
 * @param {IParams} params
 */
export const putFile = async (req: any): Promise<"ok" | Boom> => {
  try {
    const { file } = req.payload;

    return "ok";
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
