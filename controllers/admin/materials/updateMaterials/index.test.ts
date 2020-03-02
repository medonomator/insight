import Boom from 'boom';
import { updateMaterials } from './';

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
    model: jest.fn(() => ({
      updateOne: jest.fn(params => {
        switch (params._id) {
          case '1':
            return 'ok';
          case 'E':
            throw new Error('Database connection error');
        }
      }),
    })),
  };
});

const getRequest = (_id: string) => ({
  payload: {
    _id,
    name: 'name',
    description: 'desc',
    tags: [{ name: 'Труд' }],
    websiteUrl: 'websiteUrl',
    youtubeUrl: 'youtubeUrl',
    audioBooks: 'audioBooks',
    books: 'books',
  },
});

describe('Testing successful response', () => {
  test('Successful update materials', async () => {
    const request = getRequest('1');
    const result = await updateMaterials(request as any);
    expect(result).toEqual('ok');
  });
});

describe('Error handling', () => {
  test('Database connection error', async () => {
    const request = getRequest('E');
    const result = await updateMaterials(request as any);
    expect(result).toMatchObject(Boom.badImplementation('Database connection error'));
  });
});
