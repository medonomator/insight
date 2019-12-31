module.exports = {
  apps: [
    {
      name: 'aphorisms',
      script: 'server.ts',
      watch: true,
      restart_delay: 2000,
      env: {
        NODE_ENV: 'production',
        MONGO_URI: 'mongodb://83.166.242.213/software',
        PORT: '80',
        PM2: 'true',
      },
    },
  ],
};
