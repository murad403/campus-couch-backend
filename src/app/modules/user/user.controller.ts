import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.service";

const signUpUser = catchAsync(async(req, res) =>{
    const newUser = await UserServices.signUpUserIntoDB(req.body);
    
})