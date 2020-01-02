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
      },
    },
  ],
};
