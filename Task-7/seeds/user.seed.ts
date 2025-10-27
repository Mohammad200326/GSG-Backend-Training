import { faker } from "@faker-js/faker";
import { User } from "../src/users/user.entity";

export const createRandomStudent = () => {
  const createdAt = faker.date.past();
  const randomStudent: Omit<User, "id"> = {
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
  const createdAt = faker.date.past();
  const randomCoach: User = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    role: "COACH",
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }),
  };
  return randomCoach;
};
