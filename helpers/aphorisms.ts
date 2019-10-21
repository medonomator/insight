import { IAphorisms } from '../controllers/admin/aphorisms/interfaces';
import { cyrToLat } from '../helpers';

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

  // filter
  if (author) {
    aphorisms = aphorisms.filter(item => {
      if (cyrToLat(item.author) === author) {
        return item;
      }
    });
  }
  if (body) {
    // your code here...
  }
  if (topic) {
    // your code here...
  }

  return aphorisms;
};
