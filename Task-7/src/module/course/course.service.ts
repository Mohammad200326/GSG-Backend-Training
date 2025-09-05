import type { Course } from "./course.entity.js";
import { CourseRepository } from "./course.repository.js";

class CourseService {
  private repository = new CourseRepository();

  getCourses(): Course[] {
    return this.repository.findAll();
  }

  getCourse(id: string): Course | undefined {
    return this.repository.findById(id);
  }

  createCourse(data: Omit<Course, "id" | "createdAt" | "updatedAt">): Course {
    return this.repository.create(data);
  }

  updateCourse(
    id: string,
    data: Partial<Omit<Course, "id" | "createdAt" | "updatedAt">>
  ): Course | null {
    return this.repository.update(id, data);
  }

  deleteCourse(id: string): boolean {
    return this.repository.delete(id);
  }
}

export const courseService = new CourseService();
