import { app } from "../../src/server";
import { signJWT } from "../../src/auth/util/jwt.util";
import { usersData } from "../../src/users/user.data";
import supertest from "supertest";

export const adminUser = usersData.find((u) => u.role === "ADMIN");
export const coachUser = usersData.find((u) => u.role === "COACH");
export const studentUser = usersData.find((u) => u.role === "STUDENT");

const adminToken = signJWT({
  name: adminUser!.name,
  sub: adminUser!.id,
  role: adminUser!.role,
});
const coachToken = signJWT({
  name: coachUser!.name,
  sub: coachUser!.id,
  role: coachUser!.role,
});
const studentToken = signJWT({
  name: studentUser!.name,
  sub: studentUser!.id,
  role: studentUser!.role,
});

export const unAuthedTestAgent = supertest.agent(app);

export const adminAuthedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${adminToken}`);

export const coachAuthedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${coachToken}`);
export const studentAuthedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${studentToken}`);
