import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import generateToken from "../../utils/generateToken";

const signUpUser = catchAsync(async (req, res) => {
    const newUser = await UserServices.signUpUserIntoDB(req.body);
    const {accessToken, refreshToken} = generateToken(newUser);
    console.log("Newuser", newUser)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Sing up successfully',
        data: {user: newUser, accessToken, refreshToken},
    })
})

export const UserControllers = {
    signUpUser
}