module.exports = {
  apps: [
    {
      name: 'aphorisms',
      script: 'server.ts',
      watch: true,
      restart_delay: 2000,
      env: {
        NODE_ENV: 'production',
        MONGO_URI: 'mongodb://51.15.245.239/software',
        PORT: '80',
        PM2: 'true',
      },
    },
  ],
};
