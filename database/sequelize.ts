import { Sequelize, Model } from 'sequelize';
import { IUserInstance, IUserProps } from '../interfaces/sequelize';

import aphorismSchema from './models/aphorisms';

export const sequelize = new Sequelize('postgres://postgres:example@localhost:5432/postgres');

export class Aphorism extends Model {}

Aphorism.init(aphorismSchema, {
  sequelize,
  tableName: 'aphorisms',
});
