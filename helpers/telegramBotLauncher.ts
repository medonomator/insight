import { Telegram, KeyboardBuilder, MarkdownV2 } from "puregram";
import dotenv from "dotenv";
import { logger } from "./logger";
import { IS_DEVELOPMENT, MESSAGES_FROM_MAIN_BOT, MAIN_BOT_ID } from "../constants";
import { getRandomNumberFromArray } from "../helpers";

const { BOT_TOKEN }: any = dotenv.config().parsed;

class TelegramBot {
  private bot: Telegram;
  constructor() {
    this.bot = new Telegram({
      token: BOT_TOKEN,
    });

    TelegramBot.startPolling(this.bot);
  }

  private static startPolling(bot) {
    bot.updates
      .startPolling()
      .then(() => console.log(`Bot started polling`))
      .catch(console.error);
  }

  public botLauncher = () => {
    if (!IS_DEVELOPMENT) {
      this.bot.api.sendMessage({ text: "Bot initialization", chat_id: MAIN_BOT_ID });
    }
    logger.info("Bot initialization");

    this.bot.updates.on("message", (context) => {
      const randomNumber = getRandomNumberFromArray(MESSAGES_FROM_MAIN_BOT);
      const SOME_BUTTON = "Some button";

      // if (context.payload.text === SOME_BUTTON) {
      //   context.send(MESSAGES_FROM_MAIN_BOT[randomNumber];
      // }
      // const keyboard = new KeyboardBuilder()
      //   .textButton(SOME_BUTTON)
      //   .row()
      //   .textButton("Two buttons")
      //   .textButton("In one row")
      //   .resize();

      // logger.info(`Message >>> ${message} <<< was sended`);
      return context.send(MESSAGES_FROM_MAIN_BOT[randomNumber]);
    });
    //
    return (text, chat_id = MAIN_BOT_ID) => {
      this.bot.api.sendMessage({ text, chat_id, parse_mode: "MarkdownV2" });
    };
  };
}

const TelegramSendMessage = new TelegramBot().botLauncher();

export default TelegramSendMessage;
