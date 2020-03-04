import Boom from 'boom';
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
            throw new Error('Database connection error');
        }
      }),
      create: jest.fn(() => {
        return 'ok';
      }),
    })),
  };
});

const getRequest = (body: string) => ({
  payload: {
    author: 'Д. Беллерс',
    body,
    tags: [{ name: 'Труд' }],
    category: 'Мыслители, философы',
  },
});

describe('Testing successful response', () => {
  test('create aphorisms', async () => {
    const request = getRequest('notDublicate');
    const result = await createAphorism(request as any);
    expect(result).toEqual('ok');
  });
});

describe('Error handling', () => {
  test('On existence an aphorism', async () => {
    const request = getRequest('dublicate');
    const result = await createAphorism(request as any);
    expect(result).toMatchObject(Boom.conflict('The aphorism with such a body already exists'));
  });
  test('Database connection error', async () => {
    const request = getRequest('E');
    const result = await createAphorism(request as any);
    expect(result).toMatchObject(Boom.badImplementation('Database connection error'));
  });
});
