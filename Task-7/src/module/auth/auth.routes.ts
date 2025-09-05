import { Router, type RequestHandler } from "express";
import { authController } from "./auth.contoller.js";

const router = Router();

// POST /api/auth - Get all users
router.post(
  "/register",
  authController.register.bind(authController) as RequestHandler
);

router.post(
  "/login-jwt",
  authController.loginWithJWT.bind(authController) as RequestHandler
);

export const authRouter = router;
