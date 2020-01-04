import Telegraf from 'telegraf';
import SocksProxyAgent from 'socks-proxy-agent';
// var HttpProxyAgent = require('http-proxy-agent');
// var ProxyAgent = require('proxy-agent');
const PROXY_HOST = 'socks://50.116.38.201:1443';
const BOT_ID = '409011202';

const telegraf: any = new Telegraf(String(process.env.BOT_TOKEN), {
  telegram: {
    agent: new SocksProxyAgent(PROXY_HOST),
  },
});

telegraf.launch();

export const telegramSendMessage = (message: string) => {
  telegraf.telegram.sendMessage(BOT_ID, message);
};
