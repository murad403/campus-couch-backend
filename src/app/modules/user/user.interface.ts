
export type TSignUpUser = {
    name: string;
    email: string;
    password: string;
    termsAndCondition: boolean;
    image: string;
    phoneNumber: string;
    address: string;
    shippingAddress: string;
    otp?: string;
    expireIn?: Date;
}

export type TSignInUser = {
    email: string;
    password: string;
}

export type TForgotPassword = {
    email: string;
}

export type TVerfifyOtp = {
    email: string;
    otp: string;
}

export type TResetPassword = {
    email: string;
    newPassword: string;
}