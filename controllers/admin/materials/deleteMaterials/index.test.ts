import Boom from 'boom';
import { deleteMaterials } from './';

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
          case '1':
            return true;
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
  },
});

describe('Testing successful response', () => {
  test('Materials successful delete', async () => {
    const request = getRequest('1');
    const result = await deleteMaterials(request as any);
    expect(result).toEqual('ok');
  });
});

describe('Error handling', () => {
  test('Database connection error', async () => {
    const request = getRequest('E');
    const result = await deleteMaterials(request as any);
    expect(result).toMatchObject(Boom.badImplementation('Database connection error'));
  });
});
