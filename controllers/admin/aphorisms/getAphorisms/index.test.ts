import { getAphorisms } from './';

const aphorismsData = [
  {
    firstField: 'firstField',
    secondField: 'secondField',
  },
];
const count = 1000;

jest.mock('../../../../helpers/aphorisms', () => ({
  takeAphorisms: async () => {
    return {
      aphorisms: aphorismsData,
      count,
    };
  },
}));

const getRequest = (author: string) => ({
  params: {
    query: {
      author,
    },
  },
});

describe('Testing successful response', () => {
  test('Get aphorisms', async () => {
    const request = getRequest('Lenin');
    const result = await getAphorisms(request as any);
    expect(result).toEqual({
      data: aphorismsData,
      count,
    });
  });
});
