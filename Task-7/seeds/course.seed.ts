import { faker } from "@faker-js/faker";
import { Course } from "../src/courses/course.entity";

const createdAt = faker.date.past();

export const createRandomCourse = (creatorId?: string) => {
  const randomCourse: Course = {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    creatorId: creatorId ?? faker.string.uuid(),
    image: faker.image.url(),
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
  };
  return randomCourse;
};
