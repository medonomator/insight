import Telegraf from 'telegraf';
var HttpProxyAgent = require('http-proxy-agent');
var ProxyAgent = require('proxy-agent');
var SocksProxyAgent = require('socks-proxy-agent');

class TelegramBot {
  public bot;
  public launch() {
    this.bot = new Telegraf(process.env.BOT_TOKEN || '1056515171:AAHTs2J8E09FoVMpIreuZu8WPKPUHQk3IiA', {
      telegram: {
        agent: new SocksProxyAgent('socks://45.55.159.57:33820'),
      },
    });
    this.bot.launch();
  }

  public sendMessage(id: string, message: string) {
    this.bot.telegram.sendMessage(id, message);
  }
}

export default TelegramBot;
