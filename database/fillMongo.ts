import { uniqBy, compact } from 'lodash';
import { cyrToLat } from '../../helpers';

(async () => {
  let res = await aphorisms
    .find({})
    .select('-_id -__v')
    .lean();

  let topics = [];

  res = res.map(item => {
    topics = topics.concat(item.tags);
  });

  topics = compact(uniqBy(topics, 'machineName'));
  await settings.insertMany({ allCategories: topics });
})();

aphorisms.forEach(({ author, body, tags }) => {
  const machineName = tags.map(item => {
    return cyrToLat.transform(item);
  });
  db.aphorismsSchema.insertMany({ author, body, tags, machineName });
});
