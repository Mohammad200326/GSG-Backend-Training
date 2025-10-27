import { RoleType } from "../users/types/constants";
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

  getCourses(): Promise<CoursesDataDTO> {
    return this.repository.findAll();
  }

  getCourseById(id: string): Promise<CourseDataDTO | undefined> {
    return this.repository.findById(id);
  }

  async createCourse(
    data: Pick<Course, "title" | "description" | "image">,
    userId: string
  ): Promise<CourseDataDTO> {
    return await this.repository.create({
      title: data.title,
      description: data.description,
      image: data.image,
      creatorId: userId,
    });
  }

  async updateCourse(
    id: string,
    data: UpdateCourseDTO,
    userId: string,
    userRole: RoleType
  ): Promise<CourseDataDTO | null> {
    const course = await this.repository.findById(id);
    if (!course) throw new Error("Course not found");

    if (course.creatorId !== userId && userRole !== "ADMIN") {
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
    return await this.repository.delete(id);
  }
}

export const courseService = new CourseService();
