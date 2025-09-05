import type { User } from "../../user/user.entity.js";

export type LoginDTO = {
  email: string;
  password: string;
};
export type LoginResponseDTO = Omit<User, "password">;
export type LoginResponseDTOWithJWT = {
  data: Omit<User, "password">;
  token: string;
};

export type RegisterDTO = Pick<User, "email" | "name" | "password">;
export type RegisterResponseDTO = Omit<User, "password">;
