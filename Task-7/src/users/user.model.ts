import { model, Schema } from "mongoose";
import { User } from "./user.entity";
import { ROLES } from "./types/constants";

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.values(ROLES),
      default: ROLES.student,
    },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = model<User>("User", userSchema);
