import z from "zod";

export const courseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
