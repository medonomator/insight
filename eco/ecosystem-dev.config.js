module.exports = {
  apps: [
    {
      name: 'aphorisms',
      script: 'server.ts',
      watch: true,
      restart_delay: 2000,
      env: {
        NODE_ENV: 'development',
        MONGO_URI: 'mongodb://51.15.245.239/software',
        // MONGO_URI: 'mongodb://localhost/software',
        PORT: '5000',
        PM2: 'true',
      },
    },
  ],
};
