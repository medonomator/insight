import { Aphorism } from '../sequelize'

// TODO: need to organize Seeds
async function stuff() {
  // Please note that when using async/await you lose the `bluebird` promise context
  // and you fall back to native
  const newAphorism = await Aphorism.create({
    author: 'author',
    body: 'body',
    category: 'category',
  });
  console.log(newAphorism);
}
stuff();
