import { ZodError, ZodType } from "zod";
import type { ModuleNameType } from "./constant.js";
import { CustomError } from "./exception.js";
import { HttpErrorStatus } from "./util.types.js";

export const zodValidation = <T>(
  schema: ZodType<T>,
  payload: T,
  moduleName: ModuleNameType
) => {
  try {
    const safeData = schema.parse(payload);
    return safeData;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new CustomError(
        error.message,
        moduleName,
        HttpErrorStatus.BadRequest
      );
    }

    throw error;
  }
};
