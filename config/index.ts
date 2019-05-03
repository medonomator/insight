export const swaggerOptions = {
  info: {
    title: 'my-software',
    version: '1.0.0',
    description: 'API для запросов',
  },
};

export const CONFIG = {
  path: process.argv[2]
    ? '../static/'
    : 'assets/'
}