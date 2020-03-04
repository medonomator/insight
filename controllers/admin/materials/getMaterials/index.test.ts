import { getMaterials } from './';

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
      find: jest.fn(() => ({
        lean: jest.fn(() => [1, 2, 3]),
      })),
      countDocuments: jest.fn(() => 100),
    })),
  };
});

describe('Testing successful response', () => {
  test('Get Materials', async () => {
    const result = await getMaterials();
    expect(result).toEqual({ data: [1, 2, 3], count: 100 });
  });
});
