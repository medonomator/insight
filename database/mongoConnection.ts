import Mongoose from 'mongoose';
import { logger } from '../helpers/logger';

const MONGO_URI = process.env.MONGO_URI || 'localhost';

const mongoConnection = async (): Promise<void> => {
  try {
    await Mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    logger.info(`Сonnected to ${MONGO_URI}`);

    if (process.env.NODE_ENV === 'development') {
      logger.debug('Mongo', 'debug mode true');
      Mongoose.set('debug', true);
    }
  } catch (error) {
    logger.error(error);
  }
};

export default mongoConnection;
