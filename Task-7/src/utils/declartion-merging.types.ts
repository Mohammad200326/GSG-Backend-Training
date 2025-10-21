import { UnifiedAPIErrorResponse } from "../middlewares/response.middleware";

export type MyEnvs = {
  PORT: string;
  JWT_SECRET: string;
};

declare global {
  namespace Express {
    interface Response {
      create: (data: object) => this;
      ok: (data: object) => this;
      error: (err: UnifiedAPIErrorResponse) => this;
    }
  }
}
