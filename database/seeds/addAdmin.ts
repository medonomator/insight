import { knex } from "../pgConnect";
import Nodemailer from "nodemailer";
import { encryptData } from '../../helpers';
console.log(process.env.NODEMAILER_AUTH_USER);

(async () => {
  try {

    const randomString = Math.random().toString(36);
    const password = encryptData(randomString, 'admin@gmail.com'.toLowerCase())

    const transporter = Nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER || 'spiritualevolution@yandex.ru',
        pass: process.env.NODEMAILER_AUTH_PASSWORD || 'generator21',
      },
    });

    const resInfo = await transporter.sendMail({
      from: "spiritualevolution@yandex.ru",
      to: 'budteschastlivi1@gmail.com',
      subject: "Подписка",
      text: `Благодарим за подписку на нашу платформу, ваш пароль: ${randomString}`,
      // html: '<b>Hello world?</b>', // html body
    }, null);

    const result = await knex("users").insert({ name: "admin", email: "admin@gmail.com", password });

    console.log(result)

    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(0)
  }
})();
