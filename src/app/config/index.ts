import dotenv from "dotenv";
dotenv.config();

export const config = {
    mongooseUri: process.env.MONGOOSE_URI,
    port: process.env.PORT,
    
}