import { RoleType } from "./types/constants";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
}
