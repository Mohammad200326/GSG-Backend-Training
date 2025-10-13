import { courseService } from "./course.service";
import { Request, Response, NextFunction } from "express";
import {
  CourseDataDTO,
  CoursesDataDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
} from "./types/course.dto";
import {
  createCourseDTOSchema,
  updateCourseDTOSchema,
} from "./util/course.schema";
import { Course } from "./course.entity";
import { CustomError, handleError } from "../utils/exception";
import { HTTPErrorStatus } from "../utils/util.types";

class CourseController {
  private service = courseService;

  createCourse = (
    req: Request<{}, {}, CreateCourseDTO>,
    res: Response<CourseDataDTO>
  ) => {
    const creatorId = req.user!.sub;
    req.body.image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const validatedData = createCourseDTOSchema.parse(req.body);
    const course = this.service.createCourse(validatedData, creatorId);
    if (!course) {
      res.error({
        message: "Failed To Create Course",
        statusCode: HTTPErrorStatus.InternalServerError,
      });
    }
    res.create(course);
  };

  getCourses = (
    req: Request,
    res: Response<CoursesDataDTO | []>,
    next: NextFunction
  ) => {
    const courses = this.service.getCourses();
    return res.ok(courses);
  };

  getCourseById = (
    req: Request<{ id: string }>,
    res: Response<CourseDataDTO | string>
  ) => {
    const id = req.params.id;
    if (!id) {
      res.error({
        message: "Course ID is required",
        statusCode: HTTPErrorStatus.BadRequest,
      });
    }
    const course = this.service.getCourseById(id);

    if (!course) {
      res.error({
        message: "Course Not Found!",
        statusCode: HTTPErrorStatus.NotFound,
      });
      return;
    }

    res.ok(course);
  };

  updateCourse = (
    req: Request<{ id: string }, {}, UpdateCourseDTO>,
    res: Response<CourseDataDTO | string>
  ) => {
    const userId = req.user!.sub;
    const userRole = req.user!.role;
    const id = req.params.id;
    if (!id) {
      res.error({
        message: "Course ID is required",
        statusCode: HTTPErrorStatus.BadRequest,
      });
    }
    req.body.image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const validatedData = updateCourseDTOSchema.parse(req.body);
    const updatedCourse = this.service.updateCourse(
      id,
      validatedData as Partial<Course>,
      userId,
      userRole
    );
    if (!updatedCourse) {
      res.error({
        message: "Failed to Update Course!",
        statusCode: HTTPErrorStatus.NotFound,
      });
      return;
    }

    return res.ok(updatedCourse);
  };

  deleteCourse = (req: Request<{ id: string }>, res: Response) => {
    const userId = req.user!.sub;
    const userRole = req.user!.role;
    const id = req.params.id;
    if (!id) {
      res.error({
        message: "Course ID is required",
        statusCode: HTTPErrorStatus.BadRequest,
      });
    }
    const course = this.service.getCourseById(id);
    if (!course) {
      res.error({
        message: "Course Not Found!",
        statusCode: HTTPErrorStatus.NotFound,
      });
      return;
    }
    const isDeleted = this.service.deleteCourse(id, userId, userRole);
    if (!isDeleted) {
      res.error({
        message: "Failed to Delete Course!",
        statusCode: HTTPErrorStatus.NotFound,
      });
    }

    res.ok(course);
  };
}

export const courseController = new CourseController();
