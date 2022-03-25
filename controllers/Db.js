import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

class Db {
  config = {
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWDB,
    database: process.env.DATABASE,
  };
  constructor() {
    if (typeof Db.inst === "object") {
      return Db.inst;
    }
    Db.inst = this;
    this.pool = mysql.createPool(this.config);
    return this;
  }
  findOne(email,pole = 'email') {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE ${pole}='${email}'`;
      this.pool.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }

  dataForPayload(email) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id,email,isactivated FROM users WHERE email='${email}'`;
      this.pool.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }

  createUser(email, password, link) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (email, password,activationlink) 
        VALUES ('${email}', '${password}','${link}');`;
      this.pool.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }

async updateUser(par,pole,where_pole,usl){
  const sql = `UPDATE users SET ${pole} = '${par}' 
          WHERE ${where_pole} = '${usl}';`
          this.pool.query(sql, (error, result) => {
            if (error) reject(error);
            return result
          });

}
  //запись токена
  saveT(id, token) {
    return new Promise((resolve, reject) => {
      //сначала нужно проверить наличие в базе и если нет то новый иначе изменить
      let sql = `SELECT * FROM token WHERE user=${id}`;
      this.pool.query(sql, (error, result) => {
        if (error) reject(error);
        if (result.length > 0) {
          // запись уже есть
          sql = `UPDATE token SET refreshtoken = '${token}' 
          WHERE user = ${id};`;
          this.pool.query(sql, (error, result) => {
            if (error) reject(error);
            resolve(result);
          });
        } else {
          // записи еще нет
          sql = `INSERT INTO token (user, refreshtoken) 
          VALUES ('${id}', '${token}');`;
          this.pool.query(sql, (error, result) => {
            if (error) reject(error);
            resolve(result);
          });
        }
      });
    });
  }
}
export default new Db();
