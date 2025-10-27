import { faker } from "@faker-js/faker";
import { Course } from "../src/courses/course.entity";

export const createRandomCourse = () => {
  const createdAt = faker.date.past();
  const randomCourse: Omit<Course, "id" | "creatorId"> = {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    image: faker.image.url(),
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
  };
  return randomCourse;
};
