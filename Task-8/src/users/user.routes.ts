import { Router } from "express";
import { userController } from "./user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();
router.use(isAuthenticated);

router.get("/me", userController.getUserById);

router.put("/me", userController.updateUser);

router.post(
  "/coach",
  authorize("ADMIN"),
  userController.createCoach.bind(userController)
);

export const userRouter = router;
