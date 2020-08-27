exports.up = async function (knex) {
  await knex.schema.createTable("subscribers", function (table) {
    table.increments("id").primary().unsigned();
    table.string("email", 128);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("materials");
};
