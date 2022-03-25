import db from "../controllers/Db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";
import dotenv from "dotenv";
dotenv.config();

class UserService {
  async registration(email, password) {
    //проверяем есть ли такой пользователь в базе
    const candidate = await db.findOne(email);
    const activationLink = uuidv4();
    if (candidate.length > 0) {
      throw new Error(`Пользователь с email: ${email} уже есть в базе`);
    }
    const hashPassword = bcrypt.hash(password, 8);
    //записываем в базу
    const user = await db.createUser(email, hashPassword, activationLink);
    //теперь необходимо отправить письмо пользователю
    await MailService.sendActivationLink(email, `${process.env.API_URL}/api/activation/${activationLink}`);
    const payload = await db.dataForPayload(email);
    let token = "";
    if (payload.length > 0) {
      token = TokenService.generateTokens({ ...payload[0] });
      await TokenService.saveToken(payload[0].id, token.refreshToken);
    } else throw new Error("***");

    return {
      ...token,
      userDto: {
        ...payload[0],
      },
    };
  }
}

export default new UserService();
