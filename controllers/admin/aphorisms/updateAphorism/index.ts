import Boom from 'boom';
import { logger } from '../../../../helpers/logger';
import {  IParamsUpdate, IResponse} from '../interfaces';
import { cyrToLat } from '../../../../helpers';
import { isEmpty } from 'lodash';
import { IItemNameMachine } from '../../../../interfaces';

/**
 * Update Aphorism
 * @param {IParamsUpdate} params
 * @return {Promise<IResponse}>
 */
export const updateAphorism = async (req: IParamsUpdate): Promise<IResponse> => {
  try {
    const { id, body, tags, category } = req.payload;
    const inMachineName: IItemNameMachine[] = [];

    if (!isEmpty(tags)) {
      tags.forEach((name: any) => {
        inMachineName.push({ name, machineName: cyrToLat(name) });
      });
    }

    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};