import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post('/sign-up', UserControllers.signUpUser);
router.post('/sign-in', UserControllers.signInUser);
router.post('/forgot-password', UserControllers.forgotPassword);
router.post('/verify-otp', UserControllers.verifyOtp);

export const UserRoutes = router;