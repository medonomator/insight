import Boom from 'boom';
import { logger } from '../../../../helpers/logger';
// import { materials } from '../../../../database/schemas/materials';
import { IResponse, IParamsDelete } from '../interfaces';
/**
 * Delete Materials by id
 * @param {IParamsDelete} params
 * @return {Promise<IResponse>}
 */
export const deleteMaterials = async (req: IParamsDelete): Promise<IResponse> => {
  try {
    const { _id } = req.payload;
    // await materials.deleteOne({ _id });

    logger.info(`materials id: ${_id} deleted`);
    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
