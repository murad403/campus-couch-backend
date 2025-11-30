import dotenv from "dotenv";
dotenv.config();

export const config = {
    mongooseUri: process.env.MONGOOSE_URI,
    port: process.env.PORT,
    saltRound: Number(process.env.SALT_ROUND),
    jwtSecret: process.env.JWT_SECRET,
    accessTokenExpireIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
    refreshTokenExpireIn: process.env.REFRESH_TOKEN_EXPIRE_IN
}