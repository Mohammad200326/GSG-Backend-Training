import { Router } from "express";
import { courseController } from "./course.controller";
import { uploadSingle } from "../config/multer.config";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  authorize("ADMIN", "COACH"),
  uploadSingle("image"),
  courseController.createCourse
);

router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourseById);

router.put(
  "/:id",
  isAuthenticated,
  authorize("ADMIN", "COACH"),
  uploadSingle("image"),
  courseController.updateCourse
);

router.delete(
  "/:id",
  isAuthenticated,
  authorize("ADMIN", "COACH"),
  courseController.deleteCourse
);

export const courseRouter = router;
