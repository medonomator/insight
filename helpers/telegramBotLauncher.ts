import Telegraf from "telegraf";
import { logger } from "./logger";
import { IS_DEVELOPMENT } from "../constants";
import dotenv from "dotenv";

const { BOT_TOKEN }: any = dotenv.config().parsed;
const BOT_ID = "409011202";

// Singleton
class TelegramBot {
  private static instance: TelegramBot;
  private _bot;
  private _proxyList: string[];
  private _lostMessages: string[] = [];
  private _currentProxy = 2;
  constructor() {
    this._bot = new Telegraf(String(BOT_TOKEN), {});
  }

  public static Init(): TelegramBot {
    if (!TelegramBot.instance) {
      TelegramBot.instance = new TelegramBot();
    }
    return TelegramBot.instance;
  }

  public sendMessage = async (message: string) => {
    try {
      await this._bot.telegram.sendMessage(BOT_ID, message);
      logger.info(`Message >>> ${message} <<< was sended`);

      this.handlerLostMessages();
    } catch (err) {
      this._lostMessages.push(message);
      logger.error(err);
    }
  };

  public async reconnectNextProxy() {
    if (this._currentProxy > this._proxyList.length) {
      this._currentProxy = 10;
    } else {
      this._currentProxy = ++this._currentProxy;
    }

    const reconnectMessage = `Telegraf reconnecting with proxy: ${this._proxyList[this._currentProxy]}`;
    logger.warn(reconnectMessage);
    this.handlerLostMessages();
  }

  private handlerLostMessages() {
    if (this._lostMessages.length) {
      const message = this._lostMessages.shift() as string;
      this.sendMessage(message);
    }
  }
}

// if (!IS_DEVELOPMENT) {
//   TelegramBot.Init().sendMessage("Bot initialization");
// }

export default TelegramBot.Init();
