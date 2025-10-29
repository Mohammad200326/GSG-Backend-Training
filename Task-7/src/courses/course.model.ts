import { model, Schema } from "mongoose";
import { Course } from "./course.entity";
import { schemaToJsonDefaultOption } from "../services/mongoose.service";

const courseSchema = new Schema<Course>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    creatorId: {
      type: "ObjectId",
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false, toJSON: schemaToJsonDefaultOption }
);

export const CourseModel = model<Course>("Course", courseSchema);
