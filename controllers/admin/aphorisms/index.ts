import { aphorisms } from '../../../database/schemas/aphorisms';
import { logger } from '../../../helpers/logger';
import { ErrorCode } from '../../../interfaces';
import {
  IParamsCreate,
  IParamsUpdate,
  IParamsDelete,
  IResponse,
  IGetResponseAphorisms,
  IParamsGet,
  IAphorisms,
} from './interfaces';
import { cyrToLat } from '../../../helpers';
import { isEmpty } from 'lodash';
import { takeAphorisms } from '../../../helpers/aphorisms';
import { deleteElement } from '../../../database/redis';

/**
 * Create New Aphorism
 * @param {IParams} params
 */
export const createAphorism = async (req: IParamsCreate): Promise<IResponse> => {
  try {
    const { author, body, tags } = req.payload;
    const tagsToWrite: any = [];

    if (tags) {
      tags.forEach(name => {
        tagsToWrite.push({ name, machineName: cyrToLat(name) });
      });
    }

    const res = await aphorisms.insertMany({ author, body, tags: tagsToWrite });

    return {
      data: {
        _id: res[0]._id,
      },
    };
  } catch (err) {
    logger.error(err);
    return {
      code: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};
/**
 * Get Aphorisms
 * @return Array
 */
export const getAphorisms = async (params: IParamsGet, h): Promise<IGetResponseAphorisms> => {
  try {
    logger.info('Get aphorisms');

    const data = <IAphorisms[]>await takeAphorisms(params.query);
    return {
      data,
      count: data.length,
    };
  } catch (err) {
    logger.error(err);
    return {
      code: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};
/**
 * Update Aphorism
 * @params {IParams} params
 */
export const updateAphorism = async (req: IParamsUpdate): Promise<IResponse> => {
  try {
    const { _id, author, body, tags } = req.payload;
    const tagsToWrite: any = [];

    if (!isEmpty(tags)) {
      tags.forEach((name: any) => {
        tagsToWrite.push({ name, machineName: cyrToLat(name) });
      });
    }
    await aphorisms.updateOne({ _id }, { $set: { author, body, tags: tagsToWrite } });

    return 'ok';
  } catch (err) {
    logger.error(err);
    return {
      code: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};
/**
 * Delete Aphorism by id
 * @params {IParams} params
 */
export const deleteAphorism = async (req, h): Promise<IResponse> => {
  try {
    const { _id } = req.payload;
    await aphorisms.deleteOne({ _id });
    logger.info(`aphorisms id: ${_id} deleted`);

    deleteElement('mongoIds', _id);
    return 'ok';
  } catch (err) {
    logger.error(err);
    return {
      code: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    };
  }
};
