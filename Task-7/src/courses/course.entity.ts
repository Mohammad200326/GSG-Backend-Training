import { ObjectId, SchemaDefinitionProperty } from "mongoose";
import { User } from "../users/user.entity";

export interface Course {
  id: string;
  title: string;
  description: string;
  image?: string | undefined;
  creatorId: SchemaDefinitionProperty<ObjectId | User, Course>;
  createdAt: Date;
  updatedAt: Date;
}
