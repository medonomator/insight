import { logger } from "../helpers/logger";
// import { aphorisms } from "../database/schemas/aphorisms";
import aphorismsModel from "../models/redis/aphorisms";
import { IAphorisms } from "../interfaces/aphorism";
import { aphorisms } from "./data/aphorisms";

export const insertDataToRedis = async (): Promise<void> => {
  try {
    // const items: IAphorisms[] = await aphorisms.find();

    await aphorismsModel.setAll(aphorisms as any);
  } catch (error) {
    logger.error(error);
  }
};
