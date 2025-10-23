import { Request, Response, NextFunction } from "express";
import { HTTPErrorStatus } from "../utils/util.types";
import { RoleType } from "../users/types/constants";

export const authorize =
  (...allowedRoles: RoleType[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user)
      return res.error({
        statusCode: HTTPErrorStatus.Unauthorized,
        message: "Not authenticated",
      });

    if (!allowedRoles.includes(user.role)) {
      return res.error({
        statusCode: HTTPErrorStatus.Forbidden,
        message: "Access denied",
      });
    }

    next();
  };
