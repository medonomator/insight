import { aphorisms } from '../database/schemas/aphorisms';
import { logger } from './logger';
// for testing RAM
declare global {
  namespace NodeJS {
    interface Global {
      aphorismsData: any;
    }
  }
}

export const insertDataToRAM = async (): Promise<void> => {
  try {
    if (!global.aphorismsData) {
      global.aphorismsData = await aphorisms
        .find()
        .select('-__v -createdAt -updatedAt')
        .sort({ createdAt: -1 })
        .lean();

      logger.info('Insert data to RAM for testing');
    }
  } catch (error) {
    logger.error(error);
  }
};
