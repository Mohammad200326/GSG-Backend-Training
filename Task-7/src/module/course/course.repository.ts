import type { Course } from "./course.entity.js";
import { GenericRepository } from "../../shared/repository.js";

export class CourseRepository extends GenericRepository<Course> {
  constructor() {
    super();
  }
}
