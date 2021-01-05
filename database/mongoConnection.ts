import Mongoose from 'mongoose';
import { logger } from '../helpers/logger';

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/test';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://83.166.242.213/test';

const mongoConnection = async () => {
  try {
    await Mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    logger.info(`Сonnected to ${MONGO_URI}`);
  } catch (error) {
    logger.error(error);
  }
};

export default mongoConnection;
