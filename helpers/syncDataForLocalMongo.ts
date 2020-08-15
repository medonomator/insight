import axios from 'axios';
import { MAIN_HOST_URL } from '../constants/index';
import { logger } from '../helpers/logger';
import { synchronizationData } from '../controllers/synchronizationData';

export const syncDataForLocalMongo = async () => {
  try {
    // const dataAphorisms = await aphorisms.countDocuments();
    // if (!dataAphorisms) {
    //   const { data } = await axios.get(`${MAIN_HOST_URL}admin/aphorisms?limit=10000`);

    //   await aphorisms.insertMany(data.data);
    //   await synchronizationData();
    //   logger.info('Synchronization complete');
    // }
    logger.info('Aphorisms data is up to date');
  } catch (error) {
    logger.error(error);
  }
};
