import Boom from 'boom';
import { logger } from '../../../../helpers/logger';
import { IResponse, IParamsGet, IResTakeAphorisms } from '../interfaces';
import { takeAphorisms } from '../../../../helpers/aphorisms';
/**
 * Get Aphorisms
 * @param {IParamsGet} params
 * @return Promise<{IResponse}>
 */
export const getAphorisms = async (params: IParamsGet): Promise<IResponse> => {
  try {
    logger.info('Get aphorisms');
    const resTakeAphorisms = (await takeAphorisms(params.query)) as IResTakeAphorisms;

    return {
      data: resTakeAphorisms.aphorisms,
      count: resTakeAphorisms.count,
    };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
