import mongoose, { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    termsAndCondition: {type: Boolean, required: true},
    image: {type: String, default: null},
    phoneNumber: {type: String, default: null},
    address: {type: String, default: null},
    shippingAddress: {type: String, default: null},
}, {
    timestamps: true
})

const User = mongoose.models.User || model<TUser>("User", userSchema);
export default User;
