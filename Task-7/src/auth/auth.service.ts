import { CreateUserDTO } from "../users/types/user.dto";
import { userService } from "../users/user.service";
import {
  LoginDTO,
  LoginDTOResponse,
  RegisterDTO,
  RegisterDTOResponse,
} from "./types/auth.dto";
import { createArgonHash, verifyArgonHash } from "./util/argon.util";

class AuthService {
  private _userService = userService;

  async register(payload: RegisterDTO): Promise<RegisterDTOResponse> {
    const hashedValue = await createArgonHash(payload.password);

    return this._userService.createStudent({
      email: payload.email,
      name: payload.name,
      password: hashedValue,
    });
  }
  async createCoachByAdmin(payload: CreateUserDTO) {
    const hashedPassword = await createArgonHash(payload.password);

    return this._userService.createCoach({
      ...payload,
      password: hashedPassword,
    });
  }

  async login(payload: LoginDTO): Promise<LoginDTOResponse | null> {
    const foundUser = await this._userService.findUserByEmail(payload.email);
    if (!foundUser) return null;
    const isPasswordMatch = await verifyArgonHash(
      payload.password,
      foundUser.password
    );

    if (!isPasswordMatch) return null;

    return foundUser;
  }
}

export const authService = new AuthService();
