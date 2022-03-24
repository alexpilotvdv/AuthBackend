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
    return this
  }
  findOne(email){
      return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM users WHERE email='${email}'`
        this.pool.query(sql, (error, result) => {
          if (error) reject(error);
          resolve(result);
        });
      })
  }

  createUser(email,password){
    return new Promise((resolve,reject)=>{
        const sql = `SELECT * FROM users WHERE email='${email}'`
        this.pool.query(sql, (error, result) => {
          if (error) reject(error);
          resolve(result);
        });
      })
  }
}
export default new Db