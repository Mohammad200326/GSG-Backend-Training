import type { Response } from "express";
import type { ModuleNameType } from "./constant.js";
import type { ErrorStatusCode } from "./util.types.js";
export class CustomError extends Error {
  public errorType = "custom";
  constructor(
    msg: string,
    public moduleName: ModuleNameType,
    public statusCode: ErrorStatusCode
  ) {
    super(msg);
  }
}

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof CustomError) {
    console.log("customError", error);
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  console.log(`internal server error`, error);
  //   we should alert ourself
  res.status(500).json({ message: "internal server error" });
};
