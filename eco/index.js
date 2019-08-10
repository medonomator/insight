module.exports = {
  apps: [
    {
      sowtware: {
        name: 'sowtware',
        cwd: '../',
        script: 'server.ts',
        watch: true,
        env: {
          MONGOURI: 'mongodb://51.15.245.239/sowtware',
          PORT: '5000',
          PM2: 'true',
        },
      },
    },
  ],
};
