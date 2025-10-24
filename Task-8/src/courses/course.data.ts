import { faker } from "@faker-js/faker";
import { Course } from "./course.entity";
import { createRandomCourse } from "../../seeds/course.seed";

export const coursesData: Course[] = faker.helpers.multiple(
  () => createRandomCourse(),
  { count: 5 }
);
