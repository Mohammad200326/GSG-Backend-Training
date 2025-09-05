import type { User } from "./user.entity.js";
import { GenericRepository } from "../../shared/repository.js";

export class UserRepository extends GenericRepository<User> {
  protected users: User[] = [];

  constructor() {
    super();
    const user: User = this.create({
      name: "Mohammad",
      email: "admin@no.com",
      password: "admin123",
      role: "ADMIN",
    });
    this.users.push(user);
  }
  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
