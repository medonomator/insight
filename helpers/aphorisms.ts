import { sortBy } from 'lodash';
import { getAllElementsByKey } from '../database/redis';

import { logger } from './logger';

interface IParams {
  limit?: number;
  offset?: number;
  category?: string;
  topic?: string;
  author?: string;
  body?: string;
  random?: boolean;
}

export const takeAphorisms = async (params?: IParams) => {
  try {
    let aphorisms = await getAllElementsByKey('mongoIds');

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

    return aphorisms;
  } catch (error) {
    logger.error(error);
    // TODO: return error message and above processing
  }
};
