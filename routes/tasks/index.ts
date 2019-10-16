import * as Hapi from 'hapi';
import { aphorisms } from '../../database/schemas/aphorisms';
import { settings } from '../../database/schemas/settings';
import { uniqBy } from 'lodash';
import { cyrToLat } from '../../helpers';
import { logger } from '../../helpers/logger';
import { ErrorCode } from '../../interfaces';
import { docsTasks } from '../../config/docs';

const usersRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/task/synchronizationAuthor',
    options: {
      ...docsTasks.synchronizationAuthor,
      auth: {
        strategy: 'users',
      },
    },
    handler: async () => {
      try {
        const allAuthors = await aphorisms.find({}).select('-_id author');

        const unuqAuthor = uniqBy(allAuthors, 'author').map(({ author }) => ({
          name: author,
          machineName: cyrToLat(author),
        }));

        // add default item
        unuqAuthor.push({
          name: 'Все',
          machineName: 'all',
        });

        await settings.update({ _id: '5d46e261d7dede08d8cbd839' }, { allAuthors: unuqAuthor }, { upsert: true });

        return 'ok';
      } catch (err) {
        logger.error(err);
        return {
          code: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
          message: err.message,
        };
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
        const authors: any = await aphorisms.find({}).select('-_id author');

        for (const item of authors) {
          await aphorisms.update(
            { author: item.author },
            { $set: { authorMachineName: cyrToLat(item.author) } },
            { multi: true },
          );
        }

        return 'ok';
      } catch (err) {
        logger.error(err);
        return {
          code: err.status || ErrorCode.INTERNAL_SERVER_ERROR,
          message: err.message,
        };
      }
    },
  },
];

export default usersRoutes;
