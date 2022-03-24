import db from '../controllers/Db.js'
import bcrypt from 'bcrypt'

class UserService {
  async registration(email, password) {
      //проверяем есть ли такой пользователь в базе
      const candidate = await db.findOne(email)
      if(candidate.length > 0){
        throw new Error(`Пользователь с email: ${email} уже есть в базе`)
      }
      const hashPassword = bcrypt.hash(password,8)
      const user = await db.createUser(email,hashPassword)
  }
}

export default new UserService();
