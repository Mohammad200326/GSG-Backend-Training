import { UnifiedAPIErrorResponse } from "../middlewares/response.middleware";

declare global {
  namespace Express {
    interface Response {
      create: (data: object) => this;
      ok: (data: object) => this;
      error: (err: UnifiedAPIErrorResponse) => this;
    }
  }
}
