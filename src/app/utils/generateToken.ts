import jwt from "jsonwebtoken";
import { config } from "../config";

const generateToken = (payload: any) =>{
    const accessToken = jwt.sign({_id: payload?._id, email: payload?.email}, config.jwtSecret!, {expiresIn: config.accessTokenExpireIn});
    const refreshToken = jwt.sign({_id: payload?._id, email: payload?.email}, config.jwtSecret!, {expiresIn: config.refreshTokenExpireIn});
    return {accessToken, refreshToken};
}

export default generateToken;