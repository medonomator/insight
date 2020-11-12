import Boom from "boom";
import { logger } from "../../../../helpers/logger";
import { ISubscriber, IResponse } from "./interfaces";
import { subscribers } from "../../../../database/schemas/subscribers";

/**
 * Get Subscribers
 * @return {Promise<IResponse}>
 */
export const getSubscribers = async () => {
  try {
    logger.info("Get Subscribers");

    const data: ISubscriber[] = await subscribers.find();

    return {
      data,
      count: data.length,
    };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
