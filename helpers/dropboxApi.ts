import fs from 'fs';
import { logger } from '../helpers/logger';
import dropboxV2Api from 'dropbox-v2-api';
import TelegramBot from './telegramBotLauncher';

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
        TelegramBot.sendMessage('Aphorisms backup failedx');
      }
      TelegramBot.sendMessage('Aphorisms backup was successful');
    },
  );
  dropbox(
    {
      resource: 'files/upload',
      parameters: {
        path: '/backup/subscribers.json',
      },
      readStream: fs.createReadStream('static/backup/subscribers.json'),
    },
    err => {
      if (err) {
        logger.error(err);
        TelegramBot.sendMessage('Subscribers backup failed');
      }
      TelegramBot.sendMessage('Subscribers backup was successful');
    },
  );
};
