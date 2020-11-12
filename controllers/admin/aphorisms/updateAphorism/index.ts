import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IParamsUpdate, IResponse } from "../interfaces";
import { cyrToLat } from "../../../../helpers";
import { isEmpty } from "lodash";
import { IItemNameMachine } from "../../../../interfaces";
import { aphorisms } from "../../../../database/schemas/aphorisms";

/**
 * Update Aphorism
 * @param {IParamsUpdate} params
 * @return {Promise<IResponse}>
 */
export const updateAphorism = async (req: IParamsUpdate): Promise<IResponse> => {
  try {
    const { id, body, tags, category, authorName } = req.payload;
    const inMachineName: IItemNameMachine[] = [];

    const res = await aphorisms.findOne({ _id: id });

    if (!res) {
      return Boom.notFound("The aphorism not found");
    }

    if (!isEmpty(tags)) {
      tags.forEach((name: any) => {
        inMachineName.push({ name, machineName: cyrToLat(name) });
      });
    }

    await aphorisms.updateOne(
      { _id: id },
      { body, tags: inMachineName, category, authorName, authorMachineName: cyrToLat(authorName) }
    );

    return "ok";
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
