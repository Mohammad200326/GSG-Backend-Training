import { JWT_PAYLOAD } from "../auth/util/jwt.util";

declare global {
  namespace Express {
    interface Request {
      user?: JWT_PAYLOAD;
    }
  }
}
