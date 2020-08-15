exports.up = async function (knex) {
  await knex.schema.createTable("aphorism_authors", function (table) {
    table.increments("id").primary().unsigned();
    table.string("name", 128).unique();
    table.string("machineName", 128);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("aphorism_authors");
};


