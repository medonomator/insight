import Boom from 'boom';
import { logger } from '../../../../helpers/logger';
import { aphorisms } from '../../../../database/schemas/aphorisms';
import { IResponse, IParamsDelete } from '../interfaces';
import { deleteElement } from '../../../../database/redis';
/**
 * Delete Aphorism by id
 * @param {IParamsDelete} params
 * @return {Promise<IResponse}>
 */
export const deleteAphorism = async (req: IParamsDelete): Promise<IResponse> => {
  try {
    const { _id } = req.payload;
    await aphorisms.deleteOne({ _id });
    deleteElement('mongoIds', _id);

    logger.info(`aphorisms id: ${_id} deleted`);
    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
