import Telegraf from 'telegraf';
import SocksProxyAgent from 'socks-proxy-agent';
import { logger } from './logger';
import proxyList from '../config/data/proxyList';
import {  IS_DEVELOPMENT } from '../constants'
// var HttpProxyAgent = require('http-proxy-agent');
// var ProxyAgent = require('proxy-agent');
const BOT_ID = '409011202';
// Singleton
class TelegramBot {
  private static instance: TelegramBot;
  private _bot;
  private _proxyList: string[];
  private _currentProxy = 0;
  constructor() {
    // TODO: in future need take proxy's from the database
    this._proxyList = proxyList;
    this._bot = new Telegraf(String(process.env.BOT_TOKEN), {
      telegram: {
        agent: new SocksProxyAgent(this._proxyList[this._currentProxy]),
      },
    });
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
    } catch (err) {
      this.reconnectNextProxy();
      logger.error(err);
    }
  };

  public reconnectNextProxy() {
    if (this._currentProxy > this._proxyList.length) {
      this._currentProxy = 0;
    } else {
      this._currentProxy = ++this._currentProxy;
    }

    this._bot = new Telegraf(String(process.env.BOT_TOKEN), {
      telegram: {
        agent: new SocksProxyAgent(this._proxyList[this._currentProxy]),
      },
    });
    const reconnectMessage = `Telegraf reconnecting with proxy: ${this._proxyList[this._currentProxy]}`;
    logger.warn(reconnectMessage);
    this.sendMessage(reconnectMessage);
  }
}

export default TelegramBot.Init();

if (!IS_DEVELOPMENT) {
  TelegramBot.Init().sendMessage('Bot initialization');
}
