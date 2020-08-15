exports.up = async function (knex) {
  await knex.schema.createTable("aphorisms", function (table) {
    table.increments("id").primary().unsigned();
    table.integer("author_id").unsigned();
    table
      .foreign("author_id")
      .references("aphorism_authors.id")
      .onDelete("cascade")
      .onUpdate("cascade");
    table.text("body", 1000);
    table.jsonb("tags");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("category", 128);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("aphorisms");
};
