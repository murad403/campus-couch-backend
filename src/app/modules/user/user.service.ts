import { config } from "../../config";
import sendMail from "../../utils/sendMail";
import { TForgotPassword, TSignInUser, TSignUpUser, TVerfifyOtp } from "./user.interface";
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
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    // console.log(typeof otp)
    sendMail({email: existsUser.email, subject: 'Reset your password within ten mins!', message: otp});
    const otpExpireTime = Date.now() + 5 * 60 * 1000;
    existsUser.otp = otp;
    existsUser.expireIn = new Date(otpExpireTime);
    await existsUser.save();
    return existsUser;
}

const verifyOtpFromDB = async(payload: TVerfifyOtp) =>{
    const {email, otp} = payload;
    const existsUser = await User.findOne({email});
    if(!existsUser){
        throw new Error('User does not exists');
    }
    if(existsUser.expireIn < new Date()){
        throw new Error('OTP expired');
    }
    if(existsUser.otp !== otp){
        throw new Error('Invalid OTP');
    }
    existsUser.otp = null;
    existsUser.expireIn = null;
    await existsUser.save();
    return existsUser;
}

export const UserServices = {
    signUpUserIntoDB,
    signInUserFromDB,
    forgotPasswordIntoDB,
    verifyOtpFromDB
}