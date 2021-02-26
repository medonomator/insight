import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IParamsUpdate, IResponse } from "../interfaces";
import { cyrToLat } from "../../../../helpers";
import { isEmpty } from "lodash";
import { IItemNameMachine } from "../../../../interfaces";
import { materials } from "../../../../database/schemas/materials";

/**
 * Update Materials
 * @param {IParamsUpdate} params
 * @return {Promise<IResponse>}
 */
export const updateMaterials = async (req: IParamsUpdate): Promise<IResponse> => {
  try {
    const { _id, name, description, tags, websiteUrl, youtubeUrl, audioBooks, books } = req.payload;
    const inMachineName: IItemNameMachine[] = [];

    if (!isEmpty(tags)) {
      tags.forEach((name: any) => {
        inMachineName.push({ name, machineName: cyrToLat(name) });
      });
    }

    await materials.updateOne(
      { _id },
      { $set: { name, description, tags: inMachineName, websiteUrl, youtubeUrl, books, audioBooks } }
    );

    return "ok";
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
