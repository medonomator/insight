import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IResponse, IParamsGet } from "../interfaces";
import aphorismsModel from "../../../../models/redis/aphorisms";
import { IAphorisms } from "../../../../interfaces/aphorism";
import { shuffle } from "lodash";

/**
 * Get Aphorisms
 * @param {IParamsGet} params
 * @return {Promise<IResponse}>
 */
export const getAphorisms = async (params: IParamsGet): Promise<IResponse> => {
  try {
    logger.info("Get aphorisms");
    const { author, topic, category, random = true, limit } = params.query;
    let aphorisms: IAphorisms[] = [];

    if (author) {
      aphorisms = await aphorismsModel.getByAuthor(author);
    } else if (topic) {
      aphorisms = await aphorismsModel.getByTag(topic);
    } else if (category) {
      aphorisms = await aphorismsModel.getByCategory(category);
    } else if (!random) {
      aphorisms = await aphorismsModel.getAll();
    } else {
      aphorisms = shuffle(await aphorismsModel.getAll());
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
