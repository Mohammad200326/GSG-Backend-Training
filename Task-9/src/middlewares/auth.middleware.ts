import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../auth/util/jwt.util";
import { HTTPErrorStatus } from "../utils/util.types";
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.error({
      statusCode: HTTPErrorStatus.Unauthorized,
      message: "Not authenticated",
    });
  }

  const jwt = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyJWT(jwt);
    req.user = payload;
    next();
    return;
  } catch (error) {
    console.log("jwt is wrong");
    return res.error({
      statusCode: HTTPErrorStatus.Unauthorized,
      message: "Invalid or expired token",
    });
  }
};
