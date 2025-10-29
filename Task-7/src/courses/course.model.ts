import { model, Schema } from "mongoose";
import { Course } from "./course.entity";

const courseSchema = new Schema<Course>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    creatorId: {
      type: "ObjectId",
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const CourseModel = model<Course>("Course", courseSchema);
