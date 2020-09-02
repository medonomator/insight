import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { knex } from "../../../../database/pgConnect";
import subscribersTable from "../../../../tables/subscribers";
import { ISubscriber, IResponse } from "./interfaces";
/**
 * Get Subscribers
 * @return {Promise<IResponse}>
 */
export const getSubscribers = async (): Promise<IResponse> => {
  try {
    logger.info("Get Subscribers");

    const subscribers: ISubscriber[] = await knex(subscribersTable.table);

    return {
      data: subscribers,
      count: subscribers.length
    };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
