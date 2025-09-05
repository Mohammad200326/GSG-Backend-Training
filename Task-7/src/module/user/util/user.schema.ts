import z from "zod";

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "COACH", "STUDENT"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});
