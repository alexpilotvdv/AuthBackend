import dotenv from "dotenv";
import db from "../controllers/Db.js";
import jwt from "jsonwebtoken";
dotenv.config();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_ACCES_TOKEN, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(id, refreshToken) {
    await db.saveT(id, refreshToken);
  }
  async deleteToken(refreshToken) {
    await db.deleteT(refreshToken);
  }
}



export default new TokenService();
