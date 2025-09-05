import { Router } from "express";
import { CourseController } from "./course.controller.js";

const router = Router();
const userController = new CourseController();

router.post("/", userController.createCourse);

router.get("/", userController.getCourses);

router.get("/:id", userController.getCourse);

router.put("/:id", userController.updateCourse);

router.delete("/:id", userController.deleteCourse);

export const userRouter = router;
