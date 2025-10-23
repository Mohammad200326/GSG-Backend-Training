import { app } from "../../src/server";
import { signJWT } from "../../src/auth/util/jwt.util";
import { usersData } from "../../src/users/user.data";
import supertest from "supertest";

const user1 = usersData[0];

const token = signJWT({ name: user1!.name, sub: user1!.id, role: user1!.role });

export const unAuthedTestAgent = supertest.agent(app);

export const authedTestAgent = supertest
  .agent(app)
  .set("AUTHORIZATION", `Bearer ${token}`);
