import Boom from 'boom';
import { getAphorisms } from './';

const aphorismsData = [
  {
    firstField: 'firstField',
    secondField: 'secondField',
  },
];

const count = 1000;

jest.mock('../../../../helpers/aphorisms', () => ({
  takeAphorisms: async query => {
    return {
      aphorisms: aphorismsData,
      count,
    };
  },
}));
jest.mock('mongoose', () => {
  const Schema = jest.fn().mockImplementation(() => ({
    pre: jest.fn(),
    index: jest.fn(),
  }));
  (<any>Schema).Types = {
    Mixed: jest.fn(),
  };
  return {
    connect: jest.fn().mockResolvedValue('Ok'),
    disconnect: jest.fn().mockResolvedValue('Ok'),
    Schema,
    model: jest.fn(() => ({
      deleteOne: jest.fn(params => {
        switch (params._id) {
          case '5d8ece02a7287b6cce77ddab':
            return true;
          case 'E':
            throw new Error('Ошибка подключения к базе');
        }
      }),
    })),
  };
});

const getRequest = (author: string) => ({
  params: {
    query: {
      author,
    },
  },
});

describe('Тестирование удачных ответов', () => {
  test('Получение афоризмов', async () => {
    const request = getRequest('Lenin');
    const result = await getAphorisms(request as any);
    expect(result).toEqual({
      data: aphorismsData,
      count,
    });
  });
});

// describe('Обработка ошибок', () => {
//   test('Ошибка подключения к базе', async () => {
//     const request = getRequest('E');
//     const result = await getAphorisms(request as any);
//     expect(result).toMatchObject(Boom.badImplementation('Ошибка подключения к базе'));
//   });
// });
