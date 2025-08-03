import { BaseRepository } from "./BaseRepository";
import { Course } from "../models/Course";

export class CourseRepository extends BaseRepository<Course> {
  constructor() {
    const initialCourses: Course[] = [
      {
        id: "c1",
        title: "React Basics",
        numOfStudents: 40,
        sections: ["state", "props", "hooks"],
      },
      {
        id: "c2",
        title: "Next.js",
        numOfStudents: 25,
        sections: ["SSR", "use client"],
      },
      {
        id: "c3",
        title: "TypeScript",
        numOfStudents: 31,
        sections: ["Union Types", "unknown type"],
      },
    ];
    super(initialCourses);
  }
}
