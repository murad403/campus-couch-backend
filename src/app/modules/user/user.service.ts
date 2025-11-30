import { TUser } from "./user.interface";
import User from "./user.model"


const signUpUserIntoDB = async(payload: TUser) =>{
    const existsUser = await User.find({email: payload.email});
    if(existsUser){
        throw new Error("User already exists");
    }
    const newUser = await User.create(payload);
    return newUser;
}

export const UserServices = {
    signUpUserIntoDB,
}