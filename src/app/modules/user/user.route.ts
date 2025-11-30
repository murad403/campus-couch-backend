import express from "express";
import { UserControllers } from "./user.controller";

const router = express.Router();

router.post('/sign-up', UserControllers.signUpUser);

export const UserRoutes = router;