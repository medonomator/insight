import fs from "fs";
import { logger } from "../helpers/logger";
import dropboxV2Api from "dropbox-v2-api";
import TelegramSendMessage from "./telegramBotLauncher";

const dropbox = dropboxV2Api.authenticate({
  token: process.env.DROPBOX_TOKEN,
});

const timeNow = () => new Date().toISOString().slice(0, -8).replace("T", "_");

export const dropboxUploadFile = () => {
  dropbox(
    {
      resource: "files/upload",
      parameters: {
        path: `/backup/aphorisms_${timeNow()}.json`,
      },
      readStream: fs.createReadStream("static/backup/aphorisms.json"),
    },
    (err) => {
      if (err) {
        logger.error(err);
        TelegramSendMessage("Aphorisms backup failed");
      } else {
        TelegramSendMessage("Aphorisms backup was successful");
      }
    }
  );
  dropbox(
    {
      resource: "files/upload",
      parameters: {
        path: `/backup/subscribers${timeNow()}.json`,
      },
      readStream: fs.createReadStream("static/backup/subscribers.json"),
    },
    (err) => {
      if (err) {
        logger.error(err);
        TelegramSendMessage("Subscribers backup failed");
      } else {
        TelegramSendMessage("Subscribers backup was successful");
      }
    }
  );
};
