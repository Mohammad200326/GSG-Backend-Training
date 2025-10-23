import { ZodType } from "zod";

export const zodValidation = <T>(schema: ZodType<T>, payload: T): T => {
  try {
    const safeData = schema.parse(payload);
    return safeData;
  } catch (error) {
    throw new Error();
  }
};
