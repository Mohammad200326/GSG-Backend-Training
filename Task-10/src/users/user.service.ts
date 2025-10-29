import {
  CreateUserDTO,
  UpdateUserDataDTO,
  UserDataResponseDTO,
} from "./types/user.dto";
import { User } from "./user.entity";
import { userRepository } from "./user.repository";

class UserService {
  private repository = userRepository;

  getUserById(id: string): Promise<UserDataResponseDTO | null> {
    return this.repository.findById(id);
  }

  updateUser(
    id: string,
    payload: UpdateUserDataDTO
  ): Promise<UserDataResponseDTO | null> {
    return this.repository.update(id, payload);
  }

  createCoach(data: CreateUserDTO): Promise<UserDataResponseDTO> {
    const coach: Pick<User, "name" | "email" | "password" | "role"> = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "COACH",
    };
    return this.repository.create(coach as User);
  }

  createStudent(data: CreateUserDTO): Promise<UserDataResponseDTO> {
    const student: Pick<User, "name" | "email" | "password" | "role"> = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: "STUDENT",
    };
    return this.repository.create(student as User);
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.repository.findByEmail(email);
  }
}

export const userService = new UserService();
