import { GenericRepository } from "../shared/repository";
import type { Course } from "./course.entity";

export class CourseRepository extends GenericRepository<Course> {
  private idCounter = 1;

  create(course: Course): Course {
    course.id = this.idCounter.toString();
    this.idCounter++;
    return super.create(course);
  }

  update(id: string, payload: Partial<Course>): Course | null {
    payload.updatedAt = new Date();
    return super.update(id, payload);
  }
}
