import db from "../controllers/Db.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import MailService from "./MailService.js";
import TokenService from "./TokenService.js";
import dotenv from "dotenv";
import ApiError from '../exception/api-error.js'
dotenv.config();

class UserService {
  async registration(email, password) {
    //проверяем есть ли такой пользователь в базе
    const candidate = await db.findOne(email);
    const activationLink = uuidv4();
    if (candidate.length > 0) {
      throw ApiError.badRequest(`Пользователь с email: ${email} уже есть в базе`);
    }
    const hashPassword = await bcrypt.hash(password, 8);
    //записываем в базу
    const user = await db.createUser(email, hashPassword, activationLink);
    //теперь необходимо отправить письмо пользователю
    await MailService.sendActivationLink(email, `${process.env.API_URL}/api/activation/${activationLink}`);
    const payload = await db.dataForPayload(email);
    let token = "";
    if (payload.length > 0) {
      token = TokenService.generateTokens({ ...payload[0] });
      await TokenService.saveToken(payload[0].id, token.refreshToken);
    } else throw ApiError.badRequest("Проблема с созданием токена");

    return {
      ...token,
      userDto: {
        ...payload[0],
      },
    };
  }
  async activate(activationlink){
    const user = await db.findOne(activationlink,'activationlink')
    const actlink = user[0].activationlink
    if(user.length === 0){
      throw ApiError.badRequest('Некорректная ссылка активации')
    }
   const rez = await db.updateUser('1','isactivated', 'activationlink', actlink)
    return rez
  }
async logout(refreshtoken){
  const rez = await TokenService.deleteToken(refreshtoken)
  return rez
}
  

async login(email, password){
       //проверяем есть ли такой пользователь в базе
    const candidate = await db.findOne(email);
    if (candidate.length === 0) {
      throw ApiError.badRequest(`Пользователь с email: ${email} не зарегистрирован`);
    }
    //проверим пароль
    const passwordFromDb = candidate[0].password
    const isPassEq = await bcrypt.compare(password,passwordFromDb)
    if(!isPassEq){
      throw ApiError.badRequest(`Пароль не верен`);
    }
    const payload = await db.dataForPayload(email);
    let token = "";
    if (payload.length > 0) {
      token = TokenService.generateTokens({ ...payload[0] });
      await TokenService.saveToken(payload[0].id, token.refreshToken);
    } else throw ApiError.badRequest("Проблема с созданием токена");

    return {
      ...token,
      userDto: {
        ...payload[0],
      },
    };
  }
}

export default new UserService();
