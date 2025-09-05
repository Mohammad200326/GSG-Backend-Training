import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import type {
  LoginDTO,
  LoginResponseDTO,
  LoginResponseDTOWithJWT,
  RegisterDTO,
  RegisterResponseDTO,
} from "./types/auth.dto.js";
import { HttpErrorStatus, type StringObject } from "../../utils/util.types.js";
import { zodValidation } from "../../utils/zod.util.js";
import { loginDTOSchema, registerDTOSchema } from "./util/auth.schema.js";
import { singJWT } from "./util/jwt.util.js";

export class AuthController {
  private service = authService;

  public async register(
    req: Request<StringObject, StringObject, RegisterDTO>,
    res: Response<RegisterResponseDTO | string>
  ) {
    try {
      const payloadData = zodValidation<RegisterDTO>(
        registerDTOSchema,
        req.body,
        "AUTH"
      );
      const user = await this.service.register(payloadData);
      res.status(201).json(user);
    } catch (error) {
      //   if (req.file) {
      //     await deleteUploadedAsset(req.file?.filename!);
      //   }
      res.status(500).json("internal server error");
    }
  }

  public async loginWithJWT(
    req: Request<StringObject, StringObject, LoginDTO>,
    res: Response<LoginResponseDTOWithJWT | string>
  ) {
    const payloadData = zodValidation(loginDTOSchema, req.body, "AUTH");
    const userData = await this.service.login(payloadData);
    if (!userData) {
      res.status(HttpErrorStatus.BadRequest).send("wrong credentials");
      return;
    }
    const token = singJWT({ sub: userData.id, name: userData.name });
    res.status(200).json({
      data: userData,
      token,
    } satisfies LoginResponseDTOWithJWT);
  }
}

export const authController = new AuthController();
