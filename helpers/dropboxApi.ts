import fs from 'fs';
import { logger } from '../helpers/logger';
import dropboxV2Api from 'dropbox-v2-api';
import { telegramSendMessage } from './telegramBotLauncher';

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
    err => {
      if (err) {
        logger.error(err);
        telegramSendMessage('Not save in Dropbox');
      }
      telegramSendMessage('Backup was Successful');
    },
  );
};
