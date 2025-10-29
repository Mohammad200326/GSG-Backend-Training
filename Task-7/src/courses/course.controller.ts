import { courseService } from "./course.service";
import { Request, Response, NextFunction } from "express";
import {
  CourseDataDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
} from "./types/course.dto";
import {
  createCourseDTOSchema,
  updateCourseDTOSchema,
} from "./util/course.schema";
import { Course } from "./course.entity";
import { HTTPErrorStatus } from "../utils/util.types";
import { ZodError } from "zod";

class CourseController {
  private service = courseService;

  createCourse = async (
    req: Request<{}, {}, CreateCourseDTO>,
    res: Response<CourseDataDTO>
  ) => {
    try {
      const creatorId = req.user!.sub;
      req.body.image = req.file ? `/uploads/${req.file.filename}` : undefined;
      const validatedData = createCourseDTOSchema.parse(req.body);
      const course = await this.service.createCourse(validatedData, creatorId);
      if (!course) {
        res.error({
          message: "Failed To Create Course",
          statusCode: HTTPErrorStatus.InternalServerError,
        });
      }
      res.create(course);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.error({
          statusCode: HTTPErrorStatus.BadRequest,
          message: "Missing required fields",
        });
      }
      return res.error({
        message: "InternalServerError",
        statusCode: HTTPErrorStatus.InternalServerError,
      });
    }
  };

  getCourses = async (
    req: Request,
    res: Response<CourseDataDTO[] | []>,
    next: NextFunction
  ) => {
    const courses = await this.service.getCourses();
    return res.ok(courses);
  };

  getCourseById = async (
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
    const course = await this.service.getCourseById(id);

    if (!course) {
      res.error({
        message: "Course Not Found!",
        statusCode: HTTPErrorStatus.NotFound,
      });
      return;
    }

    res.ok(course);
  };

  updateCourse = async (
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
    const updatedCourse = await this.service.updateCourse(
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

  deleteCourse = async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.user!.sub;
    const userRole = req.user!.role;
    const id = req.params.id;
    if (!id) {
      res.error({
        message: "Course ID is required",
        statusCode: HTTPErrorStatus.BadRequest,
      });
    }
    const course = await this.service.getCourseById(id);
    if (!course) {
      res.error({
        message: "Course Not Found!",
        statusCode: HTTPErrorStatus.NotFound,
      });
      return;
    }
    const isDeleted = await this.service.deleteCourse(id, userId, userRole);
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
