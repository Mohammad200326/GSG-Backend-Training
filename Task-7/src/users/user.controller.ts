import { authService } from "../auth/auth.service";
import {
  CreateUserDTO,
  UpdateUserDataDTO,
  UserDataResponseDTO,
} from "./types/user.dto";
import { userService } from "./user.service";
import { Request, Response } from "express";
import {
  createUserDTOSchema,
  updateUserDataDTOSchema,
} from "./util/user.schema";
import { User } from "./user.entity";
import { CustomError, handleError } from "../utils/exception";
import { HTTPErrorStatus } from "../utils/util.types";

class UserController {
  private service = userService;
  private _authService = authService;

  getUserById = (req: Request, res: Response<UserDataResponseDTO>) => {
    const id = req.user!.sub;
    const user = this.service.getUserById(id);
    if (!user) {
      res.error({
        message: "User Not Found!",
        statusCode: HTTPErrorStatus.NotFound,
      });
      return;
    }
    return res.ok(user);
  };

  updateUser = (
    req: Request<{}, {}, UpdateUserDataDTO>,
    res: Response<UserDataResponseDTO>
  ) => {
    const id = req.user!.sub;
    const validatedData = updateUserDataDTOSchema.parse(req.body);
    const user = this.service.updateUser(id, validatedData as Partial<User>);
    if (!user) {
      res.error({
        message: "User Not Found!",
        statusCode: HTTPErrorStatus.NotFound,
      });
      return;
    }
    return res.ok(user);
  };

  async createCoach(
    req: Request<{}, {}, CreateUserDTO>,
    res: Response<UserDataResponseDTO>
  ) {
    try {
      const validatedData = createUserDTOSchema.parse(req.body);
      const coach = await this._authService.createCoachByAdmin(validatedData);
      res.create(coach);
    } catch (error) {
      res.error({
        message: "Failed To Create Coach",
        statusCode: HTTPErrorStatus.InternalServerError,
      });
    }
  }
}

export const userController = new UserController();
