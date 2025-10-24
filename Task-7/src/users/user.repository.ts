import { GenericRepository } from "../shared/repository";
import { usersData } from "./user.data";
import { User } from "./user.entity";

export class UserRepository extends GenericRepository<User> {
  constructor() {
    super(usersData);
  }

  private idCounter = 2;

  create(user: User): User {
    user.id = this.idCounter.toString();
    this.idCounter++;
    return super.create(user);
  }

  update(id: string, payload: Partial<User>): User | null {
    payload.updatedAt = new Date();
    return super.update(id, payload);
  }

  findByEmail(email: string): User | undefined {
    return this.findAll().find((user) => user.email === email);
  }
}
