import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IParamsCreate, IResponse } from "../interfaces";
import { IItemNameMachine } from "../../../../interfaces";
import { cyrToLat } from "../../../../helpers";
import { materials } from "../../../../database/schemas/materials";

/**
 * Create New Material
 * @param {IParamsCreate} params
 * @return {Promise<IResponse}>
 */
export const createMaterials = async (req: IParamsCreate): Promise<IResponse> => {
  try {
    const { name, description, tags, websiteUrl, youtubeUrl, audioBooks, books } = req.payload;
    const inMachineName: IItemNameMachine[] = [];

    const duplicate = await materials.findOne({ name });

    if (duplicate) {
      return Boom.conflict("The material with such a name already exists");
    }

    if (tags) {
      tags.forEach((name) => {
        inMachineName.push({ name, machineName: cyrToLat(name) });
      });
    }

    await materials.create({ name, description, tags: inMachineName, websiteUrl, youtubeUrl, audioBooks, books });

    return "ok";
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
