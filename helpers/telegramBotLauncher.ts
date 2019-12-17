import Telegraf from 'telegraf';

class TelegramBot {
  public bot;
  public launch() {
    this.bot = new Telegraf(process.env.BOT_TOKEN || '1056515171:AAHTs2J8E09FoVMpIreuZu8WPKPUHQk3IiA');
    this.bot.launch();
  }

  public sendMessage(id: string, message: string) {
    this.bot.telegram.sendMessage(id, message);
  }
}

export default TelegramBot;
