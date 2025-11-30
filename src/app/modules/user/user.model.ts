import mongoose, { model, Schema } from "mongoose";
import { TSignUpUser } from "./user.interface";

const userSchema = new Schema<TSignUpUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    termsAndCondition: {type: Boolean, required: true},
    image: {type: String, default: null},
    phoneNumber: {type: String, default: null},
    address: {type: String, default: null},
    shippingAddress: {type: String, default: null},
    otp: {type: String},
    expireIn: {type: Date}
}, {
    timestamps: true
})

const User = mongoose.models.User || model<TSignUpUser>("User", userSchema);
export default User;
