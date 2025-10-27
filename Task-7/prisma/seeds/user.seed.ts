import { faker } from "@faker-js/faker";
import { createRandomCoach, createRandomStudent } from "../../seeds/user.seed";
import { prisma } from "../../src/services/prisma.service";

export const usersSeed = async () => {
  const students = faker.helpers.multiple(createRandomStudent, { count: 5 });
  const coaches = faker.helpers.multiple(createRandomCoach, { count: 5 });
  const users = [...students, ...coaches];

  for (const user of users) {
    await prisma.user.create({
      data: { ...user },
    });
  }
};
