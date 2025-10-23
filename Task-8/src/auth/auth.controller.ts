import { authService } from "./auth.service";
import { Request, Response } from "express";
import {
  LoginDTO,
  LoginDTOResponse,
  LoginDTOResponseWithJWT,
  RegisterDTO,
  RegisterDTOResponse,
} from "./types/auth.dto";
import { loginDTOSchema, registerDTOSchema } from "./util/auth.schema";
import { signJWT } from "./util/jwt.util";
import { HTTPErrorStatus } from "../utils/util.types";
import { CustomError, handleError } from "../utils/exception";

class AuthController {
  private service = authService;

  async register(
    req: Request<{}, {}, RegisterDTO>,
    res: Response<RegisterDTOResponse | string>
  ) {
    try {
      const validatedData = registerDTOSchema.parse(req.body);

      const user = await this.service.register(validatedData);

      res.create(user);
    } catch (error) {
      res.error({
        message: "Filed To Create Student",
        statusCode: HTTPErrorStatus.InternalServerError,
      });
    }
  }

  async login(
    req: Request<{}, {}, LoginDTO>,
    res: Response<LoginDTOResponseWithJWT | string>
  ) {
    const validatedData = loginDTOSchema.parse(req.body);
    const user = await this.service.login(validatedData);
    if (!user) {
      res.error({
        message: "Wrong Credentials!",
        statusCode: HTTPErrorStatus.BadRequest,
      });
      return;
    }

    const token = signJWT({
      sub: user.id,
      name: user.name,
      role: user.role,
    });
    res
      .status(200)
      .header("Authorization", `Bearer ${token}`)
      .json({ data: user, token });
  }
}

export const authController = new AuthController();
