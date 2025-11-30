import { config } from "../../config";
import { TForgotPassword, TSignInUser, TSignUpUser } from "./user.interface";
import User from "./user.model";
import bcrypt from "bcrypt";

const signUpUserIntoDB = async(payload: TSignUpUser) =>{
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

const signInUserFromDB = async(payload: TSignInUser) =>{
    const existsUser = await User.findOne({email: payload.email});
    if(!existsUser){
        throw new Error("User does not exists");
    }
    const isPasswordMatched = await bcrypt.compare(payload.password, existsUser.password);
    if(!isPasswordMatched){
        throw new Error("Invalid password, Please try again!");
    }
    const userObject = existsUser.toObject();
    const {password, __v, ...safeUser} = userObject;
    return safeUser;
}

const forgotPasswordIntoDB = async(payload: TForgotPassword) =>{
    const {email} = payload;
    const existsUser = await User.findOne({email});
    if(!existsUser){
        throw new Error("This user does not exists");
    }
    return existsUser;
}

export const UserServices = {
    signUpUserIntoDB,
    signInUserFromDB,
    forgotPasswordIntoDB
}