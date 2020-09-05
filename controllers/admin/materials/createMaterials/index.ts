import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IParamsCreate, IResponse } from "../interfaces";
import { IItemNameMachine } from "../../../../interfaces";
import { cyrToLat } from "../../../../helpers";
import { knex } from "../../../../database/pgConnect";
/**
 * Create New Material
 * @param {IParamsCreate} params
 * @return {Promise<IResponse}>
 */
export const createMaterials = async (req: IParamsCreate): Promise<IResponse> => {
  try {
    const { name, description, tags, websiteUrl, youtubeUrl, audioBooks, books } = req.payload;
    const inMachineName: IItemNameMachine[] = [];

    const duplicate = await knex("materials")
      .where({ name })
      .first();

    if (duplicate) {
      return Boom.conflict("The material with such name already exists");
    }

    if (tags) {
      tags.forEach(name => {
        inMachineName.push({ name, machineName: cyrToLat(name) });
      });
    }

    await knex("materials").insert({
      name,
      description,
      website_url: websiteUrl,
      youtube_url: youtubeUrl,
      audiobooks: audioBooks,
      books,
      tags: inMachineName
    });

    return "ok";
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
