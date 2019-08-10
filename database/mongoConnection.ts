import * as Mongoose from 'mongoose';
import { logger } from '../helpers/logger';

const MONGO_URI = process.env.MONGO_URI || '51.15.245.239';

export const setUpconnection = async () => {
  try {
    await Mongoose.connect(`mongodb://${MONGO_URI}/software`, { useNewUrlParser: true });
    logger.info('Сonnected to mongodb');
  } catch (error) {
    logger.error(error);
  }
};
