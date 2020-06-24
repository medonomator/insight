import { cyrToLat } from './../../../../helpers/index';
import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IResponse, IParamsGet } from "../interfaces";
import aphorismsModel from "../../../../models/redis/aphorisms";
import { IAphorisms } from "../../../../interfaces/aphorism";

/**
 * Get Aphorisms
 * @param {IParamsGet} params
 * @return {Promise<IResponse}>
 */
export const getAphorisms = async (params: IParamsGet): Promise<IResponse> => {
  try {
    logger.info("Get aphorisms");

    let aphorisms: IAphorisms[] = [];

    if (params.query.author) {
  
      aphorisms = await aphorismsModel.getByAuthor(
        cyrToLat(params.query.author) as string
      );

      console.log('==============================================');
      console.dir(aphorisms.length, {depth: 5})
      console.log('==============================================');
      
    } else {
      console.log('==============================================');
      console.dir('WTF?', {depth: 5})
      console.log('==============================================');
      
      aphorisms = await aphorismsModel.getAll();
    }

    return {
      data: aphorisms,
      count: aphorisms.length,
    };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
