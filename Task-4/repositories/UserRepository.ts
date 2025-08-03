import { BaseRepository } from "./BaseRepository";
import { User } from "../models/User";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    const initialUsers: User[] = [
      {
        id: "u1",
        name: "Mohammad",
        age: 28,
        email: "mohammad@example.com",
        phoneNumber: 102030102,
      },
      {
        id: "u2",
        name: "Layla",
        age: 24,
        email: "layla@example.com",
        phoneNumber: 5060708090,
      },
      {
        id: "u3",
        name: "Ali",
        age: 18,
        email: "Ali@example.com",
        phoneNumber: 1122334455,
      },
    ];
    super(initialUsers);
  }
}
