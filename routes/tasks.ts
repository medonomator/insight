import * as Hapi from 'hapi';
import Boom from 'boom';
import { aphorisms } from '../database/schemas/aphorisms';
import { authors } from '../database/schemas/authors';
import { topics } from '../database/schemas/topics';
import { uniqBy } from 'lodash';
import { cyrToLat } from '../helpers';
import { logger } from '../helpers/logger';

import { docsTasks } from '../config/docs';

interface IItem {
  name: string;
  machineName: string;
}

const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/task/synchronizationData',
    options: {
      ...docsTasks.synchronizationData,
      auth: {
        strategy: 'users',
      },
    },
    handler: async () => {
      try {
        const authorsAndCats = await aphorisms
          .find()
          .select('-_id author tags')
          .lean();
        const defaultItem = {
          name: 'Все',
          machineName: 'all',
        };
        const uniqAuthors: IItem[] = [];
        let allTopics: IItem[] = [];

        uniqBy(authorsAndCats, 'author').map(({ author, tags }) => {
          uniqAuthors.push({
            name: author,
            machineName: cyrToLat(author),
          });
          allTopics = allTopics.concat(tags);
        });

        const uniqTopics = uniqBy(allTopics, 'machineName');
        uniqAuthors.push(defaultItem);
        // With { ordered: false } all the same return an error 500 if there are duplicates
        // but still write in the collection new items
        // and execute asynchronyous
        authors.insertMany(uniqAuthors, { ordered: false });
        topics.insertMany(uniqTopics, { ordered: false });

        logger.info('Synchronization was successful');

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
    options: {
      ...docsTasks.dynamicTask,
      auth: {
        strategy: 'users',
      },
    },
    handler: async () => {
      try {
        // ...
        return 'ok';
      } catch (err) {
        logger.error(err);
        return Boom.badImplementation(err.message);
      }
    },
  },
];

export default usersRoutes;
