import { User } from "../user.entity";

export type UserDataResponseDTO = Omit<User, "password">;

export type UpdateUserDataDTO = Partial<
  Pick<User, "email" | "name" | "password">
>;

export type CreateUserDTO = Pick<User, "email" | "name" | "password">;
