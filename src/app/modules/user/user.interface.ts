
export type TSignUpUser = {
    name: string;
    email: string;
    password: string;
    termsAndCondition: boolean;
    image: string;
    phoneNumber: string;
    address: string;
    shippingAddress: string;
}

export type TSignInUser = {
    email: string;
    password: string;
}

export type TForgotPassword = {
    email: string;
}