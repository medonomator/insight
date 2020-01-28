import Boom from 'boom';
import { mainData } from '../../../../database/schemas/mainData';
import { logger } from '../../../../helpers/logger';
/**
 * Get main data
 * @param {}
 * @return Promise<{}>
 */
export const getMainData = async () => {
  try {
    logger.info(`Get main data`);
    return mainData.findById('5e1d4447a8f5be06149d863b');
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
