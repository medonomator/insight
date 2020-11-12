import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { IResponse, IParamsDelete } from "../interfaces";
import { aphorisms } from "../../../../database/schemas/aphorisms";

/**
 * Delete Aphorism by id
 * @param {IParamsDelete} params
 * @return {Promise<IResponse}>
 */
export const deleteAphorism = async (req: IParamsDelete): Promise<IResponse> => {
  try {
    const { id } = req.payload;

    const res = await aphorisms.findOneAndDelete({ _id: id });

    if (!res) {
      return Boom.notFound("The aphorism not found");
    }

    logger.info(`aphorisms id: ${id} deleted`);
    return "ok";
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
