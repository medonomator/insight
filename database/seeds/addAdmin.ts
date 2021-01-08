import Nodemailer from "nodemailer";
import { encryptData } from "../../helpers";
import { users } from "../schemas/users";
import mongoConnection from "../mongoConnection";

mongoConnection();
(async () => {
  try {
    const randomString = Math.random().toString(36);
    const password = encryptData(randomString, "admin2@gmail.com".toLowerCase());

    const transporter = Nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    await transporter.sendMail(
      {
        from: "spiritualevolution@yandex.ru",
        to: "budteschastlivi1@gmail.com",
        subject: "Create Admin",
        text: `Password: ${randomString}`,
        // html: '<b>Hello world?</b>', // html body
      },
      null
    );

    const result = await users.create({ name: "admin", email: "admin@gmail.com", password });

    console.log(result);

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
