import { aphorisms } from '../../../database/schemas/aphorisms';
import { logger } from '../../../helpers/logger';
import { ErrorStatus } from '../../../interfaces';
import {
  IParamsCreate,
  IParamsUpdate,
  IParamsDelete,
  IResponse,
  IGetResponseAphorisms,
  IAphorisms,
} from './interfaces';
import { cyrToLat } from '../../../helpers';
import { isEmpty } from 'lodash';
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
    await aphorisms.insertMany({ author, body, tags: tagsToWrite });

    return 'ok';
  } catch (err) {
    logger.error(err);
    return {
      status: err.status || ErrorStatus.internalServerError,
      message: err.message,
    };
  }
};
/**
 * Get All Aphorisms
 * @return Array
 */
export const getAphorisms = async (): Promise<IGetResponseAphorisms> => {
  try {
    const data: IAphorisms[] | any = await aphorisms.find({}).select('-__v');
    const count = await aphorisms.countDocuments();
    return {
      data,
      count,
    };
  } catch (err) {
    logger.error(err);
    return {
      status: err.status || ErrorStatus.internalServerError,
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
      status: err.status || ErrorStatus.internalServerError,
      message: err.message,
    };
  }
};
/**
 * Delete Aphorism by id
 * @params {IParams} params
 */
export const deleteAphorism = async (req: IParamsDelete): Promise<IResponse> => {
  try {
    const { _id } = req.payload;
    await aphorisms.deleteOne({ _id });

    return 'ok';
  } catch (err) {
    logger.error(err);
    return {
      status: err.status || ErrorStatus.internalServerError,
      message: err.message,
    };
  }
};
