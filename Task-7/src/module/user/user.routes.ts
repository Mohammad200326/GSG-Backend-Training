import { Router } from "express";
import { UserController } from "./user.controller.js";

const router = Router();
const userController = new UserController();
router.get("/", userController.getUsers);

router.get("/:id", userController.getUser);

router.put("/:id", userController.updateUser);

router.post("/coach", userController.addCoach);

export const userRouter = router;
