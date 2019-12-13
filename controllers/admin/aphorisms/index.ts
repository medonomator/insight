import Boom from 'boom';
import { aphorisms } from '../../../database/schemas/aphorisms';
import { logger } from '../../../helpers/logger';
import { IParamsCreate, IParamsUpdate, IResponse, IParamsGet, IParamsDelete, IResTakeAphorisms } from './interfaces';
import { cyrToLat } from '../../../helpers';
import { isEmpty } from 'lodash';
import { takeAphorisms } from '../../../helpers/aphorisms';
import { deleteElement } from '../../../database/redis';
import { IItemNameMachine } from '../../../interfaces';
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

    return aphorisms.create({ author, body, tags: inMachineName, category }) as any;
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
/**
 * Get Aphorisms
 * @param {IParamsGet} params
 * @return Promise<{IResponse}>
 */
export const getAphorisms = async (params: IParamsGet): Promise<IResponse> => {
  try {
    logger.info('Get aphorisms');
    const resTakeAphorisms = await takeAphorisms(params.query) as IResTakeAphorisms;

    return {
      data: resTakeAphorisms.aphorisms,
      count: resTakeAphorisms.count
    };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
/**
 * Update Aphorism
 * @param {IParamsUpdate} params
 * @return Promise<{IResponse}>
 */
export const updateAphorism = async (req: IParamsUpdate): Promise<IResponse> => {
  try {
    const { _id, author, body, tags } = req.payload;
    const inMachineName: IItemNameMachine[] = [];

    if (!isEmpty(tags)) {
      tags.forEach((name: any) => {
        inMachineName.push({ name, machineName: cyrToLat(name) });
      });
    }
    await aphorisms.updateOne({ _id }, { $set: { author, body, tags: inMachineName } });

    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
/**
 * Delete Aphorism by id
 * @param {IParamsDelete} params
 * @return Promise<{IResponse}>
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
