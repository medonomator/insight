import { aphorisms } from '../../../database/schemas/aphorisms';
import { settings } from '../../../database/schemas/settings';
import { logger } from '../../../helpers/logger';
import { ErrorStatus } from '../../../interfaces';
import {
  IParamsCreate,
  IParamsUpdate,
  IParamsDelete,
  IResponse,
  IGetResponseAphorisms,
  IAphorisms,
  IParamsGet,
} from './interfaces';
import { cyrToLat } from '../../../helpers';
import { isEmpty, shuffle } from 'lodash';
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
      _id: res[0]._id,
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
 * Get All Aphorisms
 * @return Array
 */
export const getAphorisms = async (params: IParamsGet): Promise<IGetResponseAphorisms> => {
  try {
    const { limit = 0, offset = 0, category, topic, author, body } = params.query;
    const cond = {};
    logger.info('Get aphorisms');

    if (!isEmpty(topic) && topic !== 'all') cond['tags.machineName'] = topic;
    if (author) cond['author'] = { $regex: author };
    if (body) cond['body'] = { $regex: body };
    if (category) cond['category'] = category;

    console.log(cond);

    const dataAphorisms = await aphorisms
      .find(cond)
      .select('-__v')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset)
      .lean();

    const count = await aphorisms.countDocuments();

    const { allCategories } = await settings
      .findOne({ allCategories: { $exists: true } })
      .lean()
      .select('allCategories -_id');

    const categories =
      allCategories &&
      allCategories
        .map(({ machineName, name }) => ({ machineName, name }))
        .sort(item => item.machineName === 'all')
        .reverse();

    return {
      data: shuffle(dataAphorisms).slice(0, 100),
      count,
      categories,
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
