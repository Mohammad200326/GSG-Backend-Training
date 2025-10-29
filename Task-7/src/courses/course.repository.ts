import { GenericRepository } from "../shared/repository";
import type { Course } from "./course.entity";
import { CourseModel } from "./course.model";

export class CourseRepository {
  async findAll(page: number, limit: number) {
    const courses = await CourseModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("creatorId")
      .exec();

    const totalRecords = await CourseModel.countDocuments().exec();

    return { courses, totalRecords };
  }

  findById(id: string): Promise<Course | null> {
    return CourseModel.findById(id).populate("creatorId").exec();
  }

  create(
    data: Pick<Course, "title" | "description" | "image" | "creatorId">
  ): Promise<Course> {
    return CourseModel.create(data);
  }

  update(
    id: string,
    data: Partial<Pick<Course, "title" | "description" | "image">>
  ): Promise<Course | null> {
    return CourseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string): Promise<Course | null> {
    return CourseModel.findByIdAndDelete(id);
  }
}
