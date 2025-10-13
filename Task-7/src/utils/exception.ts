import { Response } from "express";
import { ModuleNameType } from "./constants";
import { ErrorStatusCode } from "./util.types";

export class CustomError extends Error {
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
    console.log("Custom Error:", error);
    res.error({ statusCode: error.statusCode, message: error.message });
    return;
  }
  console.log("Internal Server Error:", error);

  res.error({ statusCode: 500, message: "Internal Server Error" });
};
