import { ErrorRequestHandler } from "express";
import { TError } from "../interface/error.interface";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log("Global error", err);
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSource: TError[] = [
        {
            path: "",
            message: "Something went wrong"
        }
    ]
    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        err
    })

}

export default globalErrorHandler;