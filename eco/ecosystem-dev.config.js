module.exports = {
  apps: [
    {
      name: 'aphorisms',
      script: 'server.ts',
      watch: true,
      restart_delay: 2000,
      ignore_watch: ['admin-panel'],
      env: {
        NODE_ENV: 'development',
        MONGO_URI: 'mongodb://134.209.163.196/software',
        // MONGO_URI: 'mongodb://localhost/software',
        PORT: '5000',
        PM2: 'true',
      },
    },
  ],
};
