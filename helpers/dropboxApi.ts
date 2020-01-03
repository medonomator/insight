import fs from 'fs';
import { logger } from '../helpers/logger';
import dropboxV2Api from 'dropbox-v2-api';

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DROPBOX_TOKEN,
});

export const dropboxUploadFile = () => {
  dropbox(
    {
      resource: 'files/upload',
      parameters: {
        path: '/backup/aphorisms.json',
      },
      readStream: fs.createReadStream('static/backup/aphorisms.json'),
    },
    (err, _, response) => {
      if (err) {
        logger.error(err);
      }
      logger.info(response);
    },
  );
};
