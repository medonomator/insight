module.exports = {
  apps: [
    {
      name: "aphorisms",
      script: "server.ts",
      ignore_watch: ["admin-panel", "static/backup"],
    },
  ],
};
