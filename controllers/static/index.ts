import { logger } from '../../helpers/logger';
import { ErrorCode } from '../../interfaces';
import { promises } from 'fs';

/**
 * Create New Aphorism
 * @param {IParams} params
 */
export const putFile = async (req: any): Promise<any> => {
  try {
    const { file } = req.payload;

    file.on('data', async data => {
      try {
        await promises.writeFile(`${process.cwd()}/static/temp/${file.hapi.filename}`, data, { encoding: 'utf8' });
      } catch (e) {
        logger.error(e.stack);
      }
    });

    return 'ok';
  } catch (err) {
    logger.error(err);
    return {
      code: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};
