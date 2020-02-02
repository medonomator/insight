import Boom from 'boom';
import { aphorisms } from '../../../../database/schemas/aphorisms';
import { createAphorism } from './';

jest.mock('../../../../helpers');
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
    model: jest.fn(params => ({
      findOne: jest.fn(({ body }) => {
        switch (body) {
          case 'dublicate':
            return true;
          case 'notDublicate':
            return null;
          case 'E':
            throw new Error('Ошибка подключения к базе');
        }
      }),
      create: jest.fn(() => {
        return 'ok';
      }),
    })),
  };
});

const findOne = aphorisms.findOne as jest.Mock;
const create = aphorisms.create as jest.Mock;

beforeEach(() => {
  findOne.mockClear();
  create.mockClear();
});

const getRequest = (body: string) => ({
  payload: {
    author: 'Д. Беллерс',
    body,
    tags: [{ name: 'Труд' }],
    category: 'Мыслители, философы',
  },
});

describe('Тестирование удачных ответов', () => {
  test('Создание афоризма', async () => {
    const request = getRequest('notDublicate');
    const result = await createAphorism(request as any);
    expect(result).toEqual('ok');
  });
});

describe('Обработка ошибок', () => {
  test('На существование афоризма', async () => {
    const request = getRequest('dublicate');
    const result = await createAphorism(request as any);
    expect(result).toMatchObject(Boom.conflict('The aphorism with such a body already exists'));
  });
});

describe('Обработка ошибок', () => {
  test('Ошибка подключения к базе', async () => {
    const request = getRequest('E');
    const result = await createAphorism(request as any);
    expect(result).toMatchObject(Boom.badImplementation('Ошибка подключения к базе'));
  });
});
