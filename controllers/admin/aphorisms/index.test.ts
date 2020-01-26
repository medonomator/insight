import Boom from 'boom';
import { aphorisms } from '../../../database/schemas/aphorisms';

import { createAphorism } from './index';

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
      collection: {
        initializeOrderedBulkOp: jest.fn(() => {
          switch (params) {
            case 'stocks_1':
              return {
                insert: jest.fn(),
                execute: jest.fn(),
              };
            case 'stocks_E':
              throw new Error();
          }
        }),
      },
      find: jest.fn(() => ({
        lean: jest.fn(() => {
          return [];
        }),
      })),
    })),
  };
});

const bulk = db.stocks('orgId').collection.initializeOrderedBulkOp as jest.Mock;
const find = db.stocks('orgId').find as jest.Mock;

beforeAll(() => {
  process.env = {
    MONGOURI: 'mongodb://123',
  };
});

beforeEach(() => {
  bulk.mockClear();
  find.mockClear();
});

const getRequest = (orgId: string) => ({
  payload: [
    {
      store: 'nameStore',
      uuid: 'faa91c0c-c3ed-11e9-aa8c-2a2ae2dbcce4',
      quantity: 10,
    },
  ],
  auth: {
    credentials: { orgId },
  },
});

describe('Тестирование удачных ответов', () => {
  test('Остатки успешно добавляются', async () => {
    const request = getRequest('1');
    const result = await controller(request as any);
    expect(result).toEqual('ok');
  });
});

describe('Обработка ошибок', () => {
  test('Ошибка подключения к базе', async () => {
    const request = getRequest('E');
    const result = await controller(request as any);
    expect(result).toMatchObject(Boom.badRequest(errorMessages.UNKNOWMN));
  });
});
