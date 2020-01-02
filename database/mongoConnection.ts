import Mongoose from 'mongoose';
import { logger } from '../helpers/logger';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/software';

const mongoConnection = async (): Promise<void> => {
  try {
    await Mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
    });
    logger.info(`Сonnected to mongodb`);

    if (process.env.NODE_ENV === 'development') {
      logger.debug('Mongo', 'debug mode true');
      Mongoose.set('debug', true);
    }
  } catch (error) {
    logger.error(error);
  }
};

export default mongoConnection;
