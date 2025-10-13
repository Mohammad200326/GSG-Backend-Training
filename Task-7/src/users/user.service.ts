import {
  CreateUserDTO,
  UpdateUserDataDTO,
  UserDataResponseDTO,
} from "./types/user.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

class UserService {
  private repository = new UserRepository();

  getUserById(id: string): UserDataResponseDTO | undefined {
    return this.repository.findById(id);
  }

  updateUser(
    id: string,
    payload: UpdateUserDataDTO
  ): UserDataResponseDTO | null {
    return this.repository.update(id, payload);
  }

  createCoach(data: CreateUserDTO): UserDataResponseDTO {
    const coach: Omit<User, "id"> = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "COACH",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.create(coach as User);
  }

  createStudent(data: CreateUserDTO): UserDataResponseDTO {
    const student: Omit<User, "id"> = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "STUDENT",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.repository.create(student as User);
  }

  findUserByEmail(email: string): User | undefined {
    return this.repository.findByEmail(email);
  }
}

export const userService = new UserService();
