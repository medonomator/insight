import Telegraf from 'telegraf';
// var HttpProxyAgent = require('http-proxy-agent');
// var ProxyAgent = require('proxy-agent');
var SocksProxyAgent = require('socks-proxy-agent');

const PROXY_HOST = 'socks://45.55.159.57:33820';

class TelegramBot {
  public bot;
  public launch() {
    this.bot = new Telegraf(String(process.env.BOT_TOKEN), {
      telegram: {
        agent: new SocksProxyAgent(PROXY_HOST),
      },
    });
    this.bot.launch();
  }

  public sendMessage(id: string, message: string) {
    this.bot.telegram.sendMessage(id, message);
  }
}

export default TelegramBot;
