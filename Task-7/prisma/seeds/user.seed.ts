import { faker } from "@faker-js/faker";
import { createRandomCoach, createRandomStudent } from "../../seeds/user.seed";
import { prisma } from "../../src/services/prisma.service";
import { createRandomCourse } from "../../seeds/course.seed";

export const usersSeed = async () => {
  const students = faker.helpers.multiple(createRandomStudent, { count: 5 });
  const coaches = faker.helpers.multiple(createRandomCoach, { count: 2 });

  for (const student of students) {
    await prisma.user.create({
      data: { ...student },
    });
  }
  for (const coach of coaches) {
    await prisma.user.create({
      data: {
        ...coach,
        courses: {
          createMany: {
            data: faker.helpers.multiple(createRandomCourse, {
              count: 2,
            }),
          },
        },
      },
    });
  }
};
