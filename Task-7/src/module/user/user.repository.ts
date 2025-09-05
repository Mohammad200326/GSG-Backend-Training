import type { User } from "./user.entity.js";
import { GenericRepository } from "../../shared/repository.js";

export class UserRepository extends GenericRepository<User> {
  constructor() {
    super();
    this.create({
      name: "Mohammad",
      email: "admin@no.com",
      password: "admin123",
      role: "ADMIN",
    });
  }
}
