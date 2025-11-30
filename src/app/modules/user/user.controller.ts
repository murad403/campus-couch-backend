import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import generateToken from "../../utils/generateToken";
import sendMail from "../../utils/sendMail";

const signUpUser = catchAsync(async (req, res) => {
    const newUser = await UserServices.signUpUserIntoDB(req.body);
    const {accessToken, refreshToken} = generateToken(newUser);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sing up successfully',
        data: {user: newUser, accessToken, refreshToken},
    })
})


const signInUser = catchAsync(async (req, res) => {
    const user = await UserServices.signInUserFromDB(req.body);
    const {accessToken, refreshToken} = generateToken(user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sing in successfully',
        data: {user, accessToken, refreshToken},
    })
})
const forgotPassword = catchAsync(async (req, res) => {
    const user = await UserServices.forgotPasswordIntoDB(req.body);
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    sendMail({email: user.email, subject: 'Reset your password within ten mins!', message: otp})
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Otp send successfully',
        data: {user},
    })
})



export const UserControllers = {
    signUpUser,
    signInUser,
    forgotPassword
}