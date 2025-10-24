import { createRandomCoach, createRandomStudent } from "../../seeds/user.seed";
import { User } from "./user.entity";

const coachUser = createRandomCoach();
const studentUser = createRandomStudent();

export const usersData: User[] = [
  {
    id: "1",
    email: "admin@no.com",
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$W+pjwEx9/oDlAfkF+RE38g$G2XLeTsWSm18VJ0BVfE78WGQ4HRm4kHOvAs/uMva3OE",
    role: "ADMIN",
    name: "Admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  coachUser,
  studentUser,
];
