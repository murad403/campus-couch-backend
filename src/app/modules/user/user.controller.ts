import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import generateToken from "../../utils/generateToken";

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
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Otp send successfully',
        data: {user},
    })
})

const verifyOtp = catchAsync(async(req, res) =>{
    const user = await UserServices.verifyOtpFromDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Otp verified successfully',
        data: {user},
    })
})


export const UserControllers = {
    signUpUser,
    signInUser,
    forgotPassword,
    verifyOtp
}