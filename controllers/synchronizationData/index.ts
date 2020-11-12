import Boom from "boom";
import { logger } from "../../helpers/logger";

export const synchronizationData = async () => {
  try {
    logger.info("Synchronization was successful");

    return "ok";
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
