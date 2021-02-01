import { logger } from "../helpers/logger";
import { aphorisms } from "../database/schemas/aphorisms";
import aphorismsModel from "../models/redis/aphorisms";
import { IAphorisms } from "../interfaces/aphorism";

export const insertDataToRedis = async (): Promise<void> => {
  try {
    const items: IAphorisms[] = await aphorisms.find();

    console.log('======================================================');
    console.log(items);
    console.log('======================================================');
    await aphorismsModel.setAll(items);
  } catch (error) {
    logger.error(error);
  }
};
