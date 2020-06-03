const { materials } = require("../seedsData/meterials");

const MATERIALS = "materials";

exports.seed = async function seed(knex) {
  for await (const item of materials) {
    const material = await knex(MATERIALS).where({ name: item.name }).first();

    if (!material) {
      delete item.tags[0]._id;

      await knex(MATERIALS).insert({
        name: item.name,
        description: item.description,
        tags: JSON.stringify(item.tags),
        website_url: item.websiteUrl,
        youtube_url: item.youtubeUrl,
        audiobooks: item.audioBooks,
        books: item.books,
      });
    }
  }
  return knex;
};
