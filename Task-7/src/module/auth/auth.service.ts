import { removeFields } from "../../utils/object.util.js";
import { userService } from "../user/user.service.js";
import type {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO,
} from "./types/auth.dto.js";
import { createArgonHash, verifyArgonHash } from "./util/argon.util.js";

class AuthService {
  private userService = userService;

  public async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
    // hash password
    const hashedValue = await createArgonHash(payload.password);
    // save user data in db
    const userData = this.userService.createUser(
      payload.name,
      payload.email,
      hashedValue
    );

    return removeFields(userData, ["password"]);
  }
  public async login(payload: LoginDTO): Promise<LoginResponseDTO | null> {
    // find email
    const foundUser = this.userService.findByEmail(payload.email);
    // if no email => return error
    if (!foundUser) return null;

    const isPasswordMatch = await verifyArgonHash(
      payload.password,
      foundUser.password
    );
    // match payload password with hashed password
    if (!isPasswordMatch) return null;

    return removeFields(foundUser, ["password"]);
  }
}

export const authService = new AuthService();
