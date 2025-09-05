import type { User } from "./user.entity.js";
import { UserRepository } from "./user.repository.js";

class UserService {
  private repository = new UserRepository();
  getUsers(): User[] {
    return this.repository.findAll();
  }
  getUser(id: string): User | undefined {
    return this.repository.findById(id);
  }

  updateUser(
    id: string,
    data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>
  ): User | null {
    return this.repository.update(id, data);
  }

  addCoach(coach: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    return this.repository.create(coach);
  }

  createUser(name: string, email: string, password: string): User {
    return this.repository.create({ name, email, password, role: "USER" });
  }

  public findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }
}

export const userService = new UserService();
