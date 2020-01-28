const { Sequelize, Model, DataTypes } = require('sequelize');

export const sequelize = new Sequelize('postgres', 'postgres', 'example', {
  dialect: 'postgres',
});

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE,
    text: DataTypes.TEXT,
  },
  { sequelize, modelName: 'user' },
);

sequelize
  .sync()
  .then(() =>
    User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20),
    }),
  )
  .then(jane => {
    console.log(jane.toJSON());
  });
