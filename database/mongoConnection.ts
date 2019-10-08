import * as Mongoose from 'mongoose';
import { logger } from '../helpers/logger';

const MONGO_URI = process.env.MONGO_URI || 'localhost';

export const setUpconnection = async () => {
  try {
    await Mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    logger.info(`Сonnected to ${MONGO_URI}`);
  } catch (error) {
    logger.error(error);
  }
};
