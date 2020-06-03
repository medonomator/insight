const CyrToLat = require("cyrillic-to-translit-js");
const { aphorisms } = require("../seedsData/aphorisms");

const APHORISM_AUTHOR_TABLE = "aphorism_authors";
const APHORISMS = "aphorisms";

exports.seed = async function seed(knex) {
  for await (const aphorism of aphorisms) {
    const author = await knex(APHORISM_AUTHOR_TABLE)
      .where({ name: aphorism.author })
      .first();

    if (!author) {
      const [newAuthorId] = await knex(APHORISM_AUTHOR_TABLE)
        .insert({
          name: aphorism.author,
          machineName: cyrToLat(aphorism.author),
        })
        .returning("id");

      await createAphorism(newAuthorId);
    } else {
      await createAphorism(author.id);
    }

    async function createAphorism(authorId) {
      const getAphorism = await knex(APHORISMS)
        .where({ body: aphorism.body })
        .first();

      if (!getAphorism) {
        await knex(APHORISMS).insert({
          author_id: authorId,
          body: aphorism.body,
          tags: JSON.stringify(aphorism.tags),
          category: aphorism.category,
        });
      }
    }
  }

  return knex;
};

function cyrToLat(symbols) {
  return new CyrToLat()
    .transform(symbols)
    .replace("'", "")
    .replace(",", "")
    .replace(/ /g, "");
}
