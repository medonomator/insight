import { aphorisms } from "./schemas/aphorisms";
import { logger } from "../helpers/logger";
import { knex } from "./pgConnect";
import aphorismsModel from "../models/redis/aphorisms";
import { uniqBy, isEmpty } from "lodash";

export const insertDataToRedis = async (): Promise<void> => {
  try {
    const aphorisms = await knex("aphorisms")
      .select([
        "aphorisms.id",
        "aphorisms.body",
        "aphorisms.tags",
        "aphorisms.category",
        "aphorisms.created_at",
        "aphorisms.updated_at",
        knex.ref("aphorism_authors.name").as("authorName"),
        knex.ref("aphorism_authors.machineName").as("authorMachineName"),
      ])
      .leftJoin(
        "aphorism_authors",
        "aphorisms.author_id",
        "aphorism_authors.id"
      );

    await aphorismsModel.setAll(aphorisms);

    const res = await aphorismsModel.getByAuthor("V.G.Belinskii");

    console.log('==============================================');
    console.log('loging', res.length);
    console.log('==============================================');
    
    // res.forEach(item => {
    //   console.log('==============================================');
    //   console.log('loging', item.tags);
    //   console.log('==============================================');
      
    // })
  } catch (error) {
    logger.error(error);
  }
};
