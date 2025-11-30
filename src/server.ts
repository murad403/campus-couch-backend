import mongoose from "mongoose"
import { config } from "./app/config"
import app from "./app";



async function main() {
    try {
        mongoose.connect(config.mongooseUri as string)
        console.log("Mongoose connected successfully");
        app.listen(config.port, () => {
            console.log(`Server is running on port ${config.port}`)
        })
    } catch (error) {
        console.log("Mongoose connection error", error);
    }
}


main()