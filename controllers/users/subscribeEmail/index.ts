import Boom from "boom";
import Nodemailer from "nodemailer";
import { logger } from "../../../helpers/logger";
import { IParams } from "./interfaces";
import TelegramBot from "../../../helpers/telegramBotLauncher";
import { subscribers } from "../../../database/schemas/subscribers";

export const subscribeEmail = async (req: IParams): Promise<"ok" | Boom> => {
  try {
    const { email } = req.payload;
    const transporter = Nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    const subscriber = await subscribers.findOne({ email });

    if (subscriber) {
      return Boom.badRequest("Вы уже подписаны");
    }

    await subscribers.create({ email });

    const resInfo = await transporter.sendMail(
      {
        from: "spiritualevolution@yandex.ru",
        to: email,
        subject: "Подписка",
        text: "Благодарим за подписку на нашу платформу",
        // html: '<b>Hello world?</b>', // html body
      },
      null
    );

    TelegramBot.sendMessage(`New subscriber is: ${email}`);

    logger.info(resInfo);
    return "ok";
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
