import Boom from 'boom';
import { uniqBy } from 'lodash';
import { IItemNameMachine } from '../../interfaces';
import { cyrToLat } from '../../helpers';
import { logger } from '../../helpers/logger';

export const synchronizationData = async () => {
  try {
    // const authorsAndCats = await aphorisms
    //   .find()
    //   .select('-_id author tags')
    //   .lean();
    const defaultItem = {
      name: 'Все',
      machineName: 'all',
    };
    const uniqAuthors: IItemNameMachine[] = [];
    let allTopics: IItemNameMachine[] = [];

    // uniqBy(authorsAndCats, 'author').map(({ author, tags }) => {
    //   uniqAuthors.push({
    //     name: author,
    //     machineName: cyrToLat(author),
    //   });
    //   tags = tags.map(({ name, machineName }) => ({ name, machineName }));
    //   allTopics = allTopics.concat(tags);
    // });

    const uniqTopics = uniqBy(allTopics, 'machineName');
    uniqAuthors.push(defaultItem);
    uniqTopics.push(defaultItem);
    // With { ordered: false } all the same return an error 500 if there are duplicates
    // but still write in the collection new items
    // and execute asynchronyous
    // authors.insertMany(uniqAuthors, { ordered: false });
    // topics.insertMany(uniqTopics, { ordered: false });

    logger.info('Synchronization was successful');

    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
