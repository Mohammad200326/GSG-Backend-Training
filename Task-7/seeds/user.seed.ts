import { faker } from "@faker-js/faker";
import { User } from "../src/users/user.entity";

const createdAt = faker.date.past();

export const createRandomStudent = () => {
  const randomStudent: User = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    role: "STUDENT",
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
  };
  return randomStudent;
};

export const createRandomCoach = () => {
  const randomStudent: User = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    role: "COACH",
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
  };
  return randomStudent;
};
