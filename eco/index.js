module.exports = {
  apps: [
    {
      users: {
        name: 'Users',
        // cwd: '/',
        script: 'server.ts',
        watch: true,
        env: {
          MONGOURI: 'mongodb://localhost/test',
          PORT: '5000'
        },
      },
    }
  ],
};