import mongoose, { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    termsAndCondition: {type: Boolean, required: true},
    image: {type: String, required: true, default: null},
    phoneNumber: {type: String, required: true, default: null},
    address: {type: String, required: true, default: null},
    shippingAddress: {type: String, required: true, default: null},
})

const User = mongoose.models.User || model<TUser>("User", userSchema);
export default User;
