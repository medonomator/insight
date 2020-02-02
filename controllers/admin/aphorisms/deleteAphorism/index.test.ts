import Boom from 'boom';
import { aphorisms } from '../../../../database/schemas/aphorisms';
import { deleteAphorism } from './';

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

// const deleteOne = aphorisms.deleteOne as jest.Mock;

// beforeEach(() => {
//   deleteOne.mockClear();
// });

const getRequest = (_id: string) => ({
  payload: {
    _id,
  },
});

describe('Тестирование удачных ответов', () => {
  test('Афоризм успешно удаляется', async () => {
    const request = getRequest('5d8ece02a7287b6cce77ddab');
    const result = await deleteAphorism(request as any);
    expect(result).toEqual('ok');
  });
});

describe('Обработка ошибок', () => {
  test('Ошибка подключения к базе', async () => {
    const request = getRequest('E');
    const result = await deleteAphorism(request as any);
    expect(result).toMatchObject(Boom.badImplementation('Ошибка подключения к базе'));
  });
});
