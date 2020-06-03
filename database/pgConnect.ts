export const knex = require("knex")({
  client: "pg",
  connection:
    process.env.PG_CONNECT_URL ||
    "postgres://postgres:1234@localhost:5432/postgres",
  searchPath: ["public"],
});
