import { GenericRepository } from "../shared/repository";
import { User } from "./user.entity";

export class UserRepository extends GenericRepository<User> {
  constructor() {
    const initialUsers: User[] = [
      {
        id: "1",
        email: "admin@no.com",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$W+pjwEx9/oDlAfkF+RE38g$G2XLeTsWSm18VJ0BVfE78WGQ4HRm4kHOvAs/uMva3OE",
        role: "ADMIN",
        name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    super(initialUsers);
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
