import { prisma } from "../services/prisma.service";
import { Course } from "./course.entity";

export class CourseRepository {
  private prismaCourse = prisma.course;

  findAll(): Promise<Course[]> {
    return this.prismaCourse.findMany();
  }

  findById(id: string): Promise<Course | undefined> {
    return this.prismaCourse.findUniqueOrThrow({ where: { id } });
  }

  create(
    data: Pick<Course, "title" | "description" | "image" | "creatorId">
  ): Promise<Course> {
    return this.prismaCourse.create({ data });
  }

  update(
    id: string,
    data: Partial<Pick<Course, "title" | "description" | "image">>
  ): Promise<Course | null> {
    return this.prismaCourse.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
      },
    });
  }

  delete(id: string): Promise<Course | null> {
    return this.prismaCourse.delete({ where: { id } });
  }
}
