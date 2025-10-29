import z, { ZodType } from "zod";
import { User } from "../user.entity";
import { CreateUserDTO, UpdateUserDataDTO } from "../types/user.dto";

export const roles = ["ADMIN", "COACH", "STUDENT"] as const;

export const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().min(3),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string().min(8),
  role: z.enum(roles),
}) satisfies ZodType<User>;

export const updateUserDataDTOSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(3).optional(),
  password: z.string().min(8).optional(),
});

export const createUserDTOSchema = userSchema.pick({
  name: true,
  password: true,
  email: true,
}) satisfies ZodType<CreateUserDTO>;
