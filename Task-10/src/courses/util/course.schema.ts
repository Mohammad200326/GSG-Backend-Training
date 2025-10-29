import z, { ZodType } from "zod";
import { Course } from "../course.entity";
import { CreateCourseDTO } from "../types/course.dto";

export const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(3),
  description: z.string(),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  creatorId: z.string(),
}) satisfies ZodType<Course>;

export const createCourseDTOSchema = courseSchema.pick({
  title: true,
  description: true,
  image: true,
}) satisfies ZodType<CreateCourseDTO>;

export const updateCourseDTOSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});
