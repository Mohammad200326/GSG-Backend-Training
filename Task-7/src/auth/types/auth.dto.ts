import { User } from "../../users/user.entity";

export type LoginDTO = Pick<User, "email" | "password">;

export type LoginDTOResponse = Omit<User, "password">;

export type LoginDTOResponseWithJWT = {
  data: Omit<User, "password">;
  token: string;
};

export type RegisterDTO = Pick<User, "email" | "name" | "password">;

export type RegisterDTOResponse = Omit<User, "password">;
