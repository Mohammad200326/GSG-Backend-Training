import type { ZodType } from "zod";
import { userSchema } from "../../user/util/user.schema.js";
import type { LoginDTO, RegisterDTO } from "../types/auth.dto.js";

export const registerDTOSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
}) satisfies ZodType<RegisterDTO>;

export const loginDTOSchema = userSchema.pick({
  email: true,
  password: true,
}) satisfies ZodType<LoginDTO>;
