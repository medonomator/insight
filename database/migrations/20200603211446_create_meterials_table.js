exports.up = async function (knex) {
  await knex.schema.createTable("materials", function (table) {
    table.increments("id").primary().unsigned();
    table.string("name", 128);
    table.text("description");
    table.text("website_url");
    table.text("youtube_url");
    table.text("audiobooks");
    table.text("books");
    table.jsonb("tags");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("materials");
};
