import dotenv from "dotenv";
import db from "../controllers/Db.js";
import jwt from "jsonwebtoken";

dotenv.config();

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCES_TOKEN, {
            expiresIn: "30m",
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

    async findToken(refreshToken) {
       const tokenData = await db.findT(refreshToken);
       return tokenData
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_ACCES_TOKEN)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN)
            return userData
        } catch (e) {
            return null
        }
    }

}


export default new TokenService();
