import mysql from 'mysql'
import dotenv from 'dotenv'
dotenv.config()

const config = {
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWDB,
    database: process.env.DATABASE,
}

try {
    const pool = mysql.createPool(config)
}
catch(e){
    console.log('db err',e)
}
const pool = mysql.createPool(config)
//module.exports = pool
export default pool
