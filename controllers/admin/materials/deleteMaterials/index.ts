import Boom from 'boom';
import { logger } from '../../../../helpers/logger';
import { IResponse, IParamsDelete } from '../interfaces';
import { materials } from "../../../../database/schemas/materials";

/**
 * Delete Materials by id
 * @param {IParamsDelete} params
 * @return {Promise<IResponse>}
 */
export const deleteMaterials = async (req: IParamsDelete): Promise<IResponse> => {
  try {
    const { id } = req.payload;
    await materials.deleteOne({ _id: id });

    logger.info(`materials id: ${id} deleted`);
    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
