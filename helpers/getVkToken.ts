import knex from "knex";
import commonData from "../models/redis/commonData";

export const getVkToken = async () => {
  return commonData.getVkToken();
};
