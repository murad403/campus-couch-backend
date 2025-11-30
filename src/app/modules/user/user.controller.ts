import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const signUpUser = catchAsync(async (req, res) => {
    const newUser = await UserServices.signUpUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is created successfully',
        data: newUser,
    })
})

export const UserControllers = {
    signUpUser
}