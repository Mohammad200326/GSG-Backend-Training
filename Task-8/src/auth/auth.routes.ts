import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.register.bind(authController));

router.post("/login", authController.login.bind(authController));

export const authRouter = router;
