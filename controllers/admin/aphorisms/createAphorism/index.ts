import Boom from 'boom';
import { aphorisms } from '../../../../database/schemas/aphorisms';
import { logger } from '../../../../helpers/logger';
import { IParamsCreate, IResponse } from '../interfaces';
import { IItemNameMachine } from '../../../../interfaces';
import { cyrToLat } from '../../../../helpers';
/**
 * Create New Aphorism
 * @param {IParamsCreate} params
 * @return Promise<{IResponse}>
 */
export const createAphorism = async (req: IParamsCreate): Promise<IResponse> => {
  try {
    const { author, body, tags, category } = req.payload;
    const inMachineName: IItemNameMachine[] = [];
    const duplicate = await aphorisms.findOne({ body });

    if (duplicate) {
      return Boom.conflict('The aphorism with such a body already exists');
    }

    if (tags) {
      tags.forEach(name => {
        inMachineName.push({ name, machineName: cyrToLat(name) });
      });
    }

    const newAphorism = await aphorisms.create({ author, body, tags: inMachineName, category });

    console.log('=================================================');
    console.log('logging', newAphorism);
    console.log('=================================================');

    return 'ok' as any;
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
