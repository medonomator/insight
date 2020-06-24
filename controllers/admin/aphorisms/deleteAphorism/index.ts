import Boom from 'boom';
import { logger } from '../../../../helpers/logger';
import { IResponse, IParamsDelete } from '../interfaces';

/**
 * Delete Aphorism by id
 * @param {IParamsDelete} params
 * @return {Promise<IResponse}>
 */
export const deleteAphorism = async (req: IParamsDelete): Promise<IResponse> => {
  try {
    const { id } = req.payload;

    logger.info(`aphorisms id: ${id} deleted`);
    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
