import * as Hapi from 'hapi';
import Boom from 'boom';
import fs from 'fs';
// import { subscribers } from '../database/schemas/subscribers';
import { logger } from '../helpers/logger';
import { docsTasks } from '../config/docs';
import { dropboxUploadFile } from '../helpers/dropboxApi';
import { synchronizationData } from '../controllers/synchronizationData';

const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/task/synchronizationData',
    options: {
      ...docsTasks.synchronizationData,
    },
    handler: synchronizationData,
  },
  {
    method: 'POST',
    path: '/task/backup',
    handler: async () => {
      try {
        // const dataAphorisms = await aphorisms.find().select('-__v');
        // const dataSubscribers = await subscribers.find();

        // await fs.promises.writeFile('static/backup/aphorisms.json', JSON.stringify(dataAphorisms));
        // await fs.promises.writeFile('static/backup/subscribers.json', JSON.stringify(dataSubscribers));
        dropboxUploadFile();
        return 'ok';
      } catch (err) {
        logger.error(err);
        return Boom.badImplementation(err.message);
      }
    },
  },
  {
    method: 'POST',
    path: '/task/dynamic',
    handler: async () => {
      try {
        logger.info('dynamic task happens');
        return 'ok';
      } catch (err) {
        logger.error(err);
        return Boom.badImplementation(err.message);
      }
    },
  },
];

export default usersRoutes;
