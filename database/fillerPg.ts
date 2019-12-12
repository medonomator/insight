import * as faker from 'faker';
import { pg } from './pgConnect';
import { settings } from './schemas/settings';
import { logger } from '../helpers/logger';

// const randomName = faker.name.findName();

export const filler = async () => {
  try {
    const res = await settings.findOne({}).lean();

    res.allAuthors.forEach(({ name, machineName }) => {
      const insertData = `INSERT INTO
                          authors(name, machine_name)
                          VALUES($1, $2)
                          returning *`;
      const values = [name, machineName];

      pg.query(insertData, values)
        .then(res => {
          console.log('=============================');
          console.log('logging', res);
          console.log('=============================');
        })
        .catch(err => {
          console.log('=============================');
          console.log('logging', err);
          console.log('=============================');
        });
    });
  } catch (error) {
    logger.error(error);
  }
};
