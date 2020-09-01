exports.up = async function(knex) {
  await knex.schema.createTable("users", function(table) {
    table
      .increments("id")
      .primary()
      .unsigned();
    table.string("name", 128).unique();
    table.string("email", 128);
    table.string("email_verified_at", 128);
    table.string("password", 128);
    table.string("remember_token", 128);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("users");
};
