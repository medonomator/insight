import { IAphorisms } from '../controllers/admin/aphorisms/interfaces';
import { cyrToLat } from '../helpers';
import { sortBy } from 'lodash';

interface IParams {
  limit?: number;
  offset?: number;
  category?: string;
  topic?: string;
  author?: string;
  body?: string;
  random?: boolean;
}

export const takeAphorisms = (aphorisms: IAphorisms[], params: IParams) => {
  const { limit = 100, random = true, author, body, topic } = params;

  // if the `random` flag is true then overwrite aphorisms
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
  if (author && author !== 'all') {
    aphorisms = aphorisms.filter(item => cyrToLat(item.author) === author);
  }
  if (body) {
    const bodyRegExp = new RegExp(body, 'g');
    aphorisms = aphorisms.filter(item => bodyRegExp.test(item.body));
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

  aphorisms = sortBy(aphorisms, item => {
    return item.body.length > 180;
  });

  return aphorisms;
};
