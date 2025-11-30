import { config } from "../../config";
import { TUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";

const signUpUserIntoDB = async(payload: TUser) =>{
    const existsUser = await User.findOne({email: payload?.email});
    if(existsUser){
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(payload.password, config.saltRound);
    const newUser = await User.create({...payload, password: hashedPassword});
    const userObject = newUser.toObject();
    const {password, __v, ...safeUser} = userObject;
    return safeUser;
}

export const UserServices = {
    signUpUserIntoDB,
}