import nodemailer from "nodemailer";
import { config } from "../config";

type TOption = {
    email: string;
    subject: string;
    message: string;
}

const sendMail = async (options: TOption) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: config.nodemailerEmail,
            pass: config.nodemailerPass,
        }
    })
    const mailOptions = {
        from: config.nodemailerEmail,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };
    await transporter.sendMail(mailOptions);
}

export default sendMail;