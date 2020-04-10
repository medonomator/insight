import { logger } from '../../helpers/logger';
import Boom from 'boom';
import { writeFile } from '../../helpers/workingWithFIles';
import faker from 'faker';
/**
 * Put on file to static/temp folder
 * @param {IParams} params
 */
export const putFile = async (req: any): Promise<'ok' | Boom> => {
  try {
    const { file } = req.payload;

    const text = 'INSERT INTO aphorism_authors(name, machine_name) VALUES($1, $2) RETURNING *';
    const values = [faker.name.findName(), faker.name.findName()];

    // file.on('data', async data => {
    //   await writeFile(`${process.cwd()}/static/temp/${file.hapi.filename}`, data);
    // });

    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
