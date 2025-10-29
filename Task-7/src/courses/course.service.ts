import { RoleType } from "../users/types/constants";
import type { Course } from "./course.entity";
import { CourseRepository } from "./course.repository";
import {
  CourseDataDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
} from "./types/course.dto";

class CourseService {
  private repository = new CourseRepository();

  createCourse(data: CreateCourseDTO, userId: string): Promise<CourseDataDTO> {
    const course: Omit<Course, "id" | "createdAt" | "updatedAt"> = {
      title: data.title,
      description: data.description,
      image: data.image,
      creatorId: userId,
    };
    return this.repository.create(course as Course);
  }

  getCourses(
    page = 1,
    limit = 10
  ): Promise<{ courses: CourseDataDTO[]; totalRecords: number }> {
    return this.repository.findAll(page, limit);
  }

  getCourseById(id: string): Promise<CourseDataDTO | null> {
    return this.repository.findById(id);
  }

  async updateCourse(
    id: string,
    data: UpdateCourseDTO,
    userId: string,
    userRole: RoleType
  ): Promise<CourseDataDTO | null> {
    const course = await this.repository.findById(id);
    if (!course) throw new Error("Course not found");

    if (course.creatorId.toString() !== userId && userRole !== "ADMIN") {
      throw new Error("Not allowed to update this course");
    }
    return this.repository.update(id, data);
  }

  async deleteCourse(
    id: string,
    userId: string,
    userRole: RoleType
  ): Promise<Course | null> {
    const course = await this.repository.findById(id);
    if (!course) throw new Error("Course not found");

    if (course.creatorId !== userId && userRole !== "ADMIN") {
      throw new Error("Not allowed to delete this course");
    }
    return this.repository.delete(id);
  }
}

export const courseService = new CourseService();
