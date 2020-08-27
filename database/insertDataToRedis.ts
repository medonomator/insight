import { logger } from "../helpers/logger";
import { knex } from "./pgConnect";
import aphorismsModel from "../models/redis/aphorisms";
import aphorismsTable from "../tables/aphorisms";
import aphorismsAuthors from "../tables/aphorism_authors";

export const insertDataToRedis = async (): Promise<void> => {
  try {
    const aphorisms = await knex(aphorismsTable.table)
      .select([
        aphorismsTable.columns.id,
        aphorismsTable.columns.body,
        aphorismsTable.columns.tags,
        aphorismsTable.columns.category,
        aphorismsTable.columns.created_at,
        aphorismsTable.columns.updated_at,
        knex.ref(aphorismsAuthors.columns.name).as("authorName"),
        knex.ref(aphorismsAuthors.columns.machineName).as("authorMachineName"),
      ])
      .leftJoin(aphorismsAuthors.table, aphorismsTable.columns.author_id, aphorismsAuthors.columns.id);

    await aphorismsModel.setAll(aphorisms);
  } catch (error) {
    logger.error(error);
  }
};
