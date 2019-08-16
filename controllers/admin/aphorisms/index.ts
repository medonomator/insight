import * as Hapi from 'hapi';
import { aphorisms } from '../../../database/schemas/aphorisms';
import { logger } from '../../../helpers/logger';
import { ErrorStatus } from '../../../helpers/error';
import { IParamsCreate, IParamsUpdate, IParamsDelete, IResponse } from './interfaces';
import { cyrToLat } from '../../../helpers';
/**
 * Create New Aphorism
 * @param {IParams} params
 */
export const createAphorism = (req: IParamsCreate) => {
  try {
    const { author, body, tags } = req.payload;
    const tagsToWrite: any = [];
    if (tags) {
      tags.forEach(name => {
        tagsToWrite.push({ name, machineName: cyrToLat(name) });
      });
    }
    aphorisms.insertMany({ author, body, tags: tagsToWrite });

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
export const getAphorisms = async () => {
  try {
    const data = await aphorisms.find({}).select('-__v');
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
export const updateAphorism = async (req: IParamsUpdate) => {
  try {
    const { _id, author, body, tags = [] } = req.payload;

    const res = await aphorisms.find({ _id });

    console.log('=============================');
    console.log('logging', res);
    console.log('=============================');

    return 'modified';
  } catch (err) {
    logger.error(err);
    return {
      status: err.status || ErrorStatus.internalServerError,
      message: err.message,
    };
  }
};
/**
 * Delete Aphorism
 * @params {IParams} params
 */
export const deleteAphorism = async (req: IParamsDelete) => {
  try {
    console.log('=============================');
    console.log('logging', 'DELETE');
    console.log('=============================');
    return 'delete';
  } catch (err) {
    logger.error(err);
    return {
      status: err.status || ErrorStatus.internalServerError,
      message: err.message,
    };
  }
};
