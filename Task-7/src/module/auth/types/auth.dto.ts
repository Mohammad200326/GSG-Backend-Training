import type { User } from "../../user/user.entity.js";

export type LoginDTO = {
  email: string;
  password: string;
};
export type LoginResponseDTO = Omit<User, "password">;

export type RegisterDTO = Pick<User, "email" | "name" | "password">;
export type RegisterResponseDTO = Omit<User, "password">;
