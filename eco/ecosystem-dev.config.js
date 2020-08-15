module.exports = {
  apps: [
    {
      name: "aphorisms",
      script: "server.ts",
      watch: true,
      restart_delay: 2000,
      ignore_watch: ["admin-panel", "static/backup"],
      env: {
        NODE_ENV: "development",
        PG_URI: "development",
      },
    },
  ],
};
