import type { Course } from "./course.entity";
import { CourseRepository } from "./course.repository";
import {
  CourseDataDTO,
  CoursesDataDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
} from "./types/course.dto";

class CourseService {
  private repository = new CourseRepository();

  createCourse(data: CreateCourseDTO, userId: string): CourseDataDTO {
    const course: Omit<Course, "id"> = {
      title: data.title,
      description: data.description,
      image: data.image,
      creatorId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.create(course as Course);
  }

  getCourses(): CoursesDataDTO {
    return this.repository.findAll();
  }

  getCourseById(id: string): CourseDataDTO | undefined {
    return this.repository.findById(id);
  }

  updateCourse(
    id: string,
    data: UpdateCourseDTO,
    userId: string,
    userRole: "ADMIN" | "COACH" | "STUDENT"
  ): CourseDataDTO | null {
    const course = this.repository.findById(id);
    if (!course) throw new Error("Course not found");

    if (course.creatorId !== userId && userRole !== "ADMIN") {
      throw new Error("Not allowed to update this course");
    }
    return this.repository.update(id, data);
  }

  deleteCourse(
    id: string,
    userId: string,
    userRole: "ADMIN" | "COACH" | "STUDENT"
  ): boolean {
    const course = this.repository.findById(id);
    if (!course) throw new Error("Course not found");

    if (course.creatorId !== userId && userRole !== "ADMIN") {
      throw new Error("Not allowed to delete this course");
    }
    return this.repository.delete(id);
  }
}

export const courseService = new CourseService();
