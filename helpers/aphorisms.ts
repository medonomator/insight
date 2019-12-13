import Boom from 'boom';
import { sortBy } from 'lodash';
import { getAllElementsByKey } from '../database/redis';
import { logger } from './logger';
import { IAphorisms, IResTakeAphorisms } from '../controllers/admin/aphorisms/interfaces';

interface IParams {
  limit?: number;
  offset?: number;
  category?: string;
  topic?: string;
  author?: string;
  body?: string;
  random?: boolean;
}

export const takeAphorisms = async (params: IParams): Promise<IResTakeAphorisms | Boom> => {
  try {
    let aphorisms: IAphorisms[] = await getAllElementsByKey('mongoIds');
    const count = aphorisms.length;

    const { limit = 100, random = true, author, body, topic, category } = params;
    if (random) {
      const generateRandomList = (lim: number, length = 0) => {
        const list = {};
        for (let i = lim; i > 0; i--) {
          const randomNumber = Math.floor(Math.random() * length) + 1;
          list[randomNumber] = randomNumber;
        }
        return list;
      };
      const randomList = generateRandomList(limit, aphorisms.length);
      aphorisms = aphorisms.filter((_, index) => index === randomList[index]);
    }

    // filters
    if (author && author !== 'Все') {
      const authorRegExp = new RegExp(author, 'g');
      aphorisms = aphorisms.filter(item => authorRegExp.test(item.author));
    }

    if (body) {
      const bodyRegExp = new RegExp(body, 'g');
      aphorisms = aphorisms.filter(item => bodyRegExp.test(item.body));
    }

    if (category) {
      aphorisms = aphorisms.filter(item => item.category === category);
    }

    if (topic && topic !== 'all') {
      aphorisms = aphorisms.filter(item => {
        for (const tag of item.tags) {
          if (tag.machineName === topic) {
            return item;
          }
        }
      });
    }

    aphorisms = sortBy(aphorisms, item => item.body.length > 180);

    return {
      aphorisms,
      count,
    };
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
