import Boom from 'boom';
import Nodemailer from 'nodemailer';
import { logger } from '../../../helpers/logger';
import { IParams } from './interfaces';
import { subscribers } from '../../../database/schemas/subscribers';
import TelegramBot from '../../../helpers/telegramBotLauncher';

export const subscribeEmail = async (req: IParams): Promise<'ok' | Boom> => {
  try {
    const { email } = req.payload;
    const transporter = Nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    const isSubscriber = await subscribers.findOne({ email });
    if (isSubscriber) {
      return Boom.badRequest('Вы уже подписаны');
    }
    await subscribers.create({ email });
    // TODO: in first need to write email to database
    const resInfo = await transporter.sendMail({
      from: 'spiritualevolution@yandex.ru',
      to: email,
      subject: 'Подписка',
      text: 'Благодарим за подписку на нашу платформу',
      // html: '<b>Hello world?</b>', // html body
    });

    // TODO: still need send message to telegram bot about successful subscibe new user
    TelegramBot.sendMessage(`Новая подписка на: ${email}`);

    logger.info(resInfo);
    return 'ok';
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
