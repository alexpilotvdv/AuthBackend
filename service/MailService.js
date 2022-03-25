import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class MailService {
  constructor() {
      console.log('maildata ',{
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationLink(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
      <div>
          <h1>Для активации аккаунта перейдите по ссылке</h1>
          <a href = "${link}">${link}</a>
      </div>
      `,
    });
  }
}
export default new MailService();
