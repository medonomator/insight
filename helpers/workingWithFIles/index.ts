import { promises } from 'fs';
import { logger } from '../../helpers/logger';

export const writeFile = async (path: string, data: Buffer): Promise<void> => {
  try {
    await promises.writeFile(path, data, { encoding: 'utf8' });
  } catch (e) {
    logger.error(e.stack);
  }
};
