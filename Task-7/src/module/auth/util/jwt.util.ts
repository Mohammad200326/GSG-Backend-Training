// sing

import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

type JWT_PAYLOAD = { sub: string; name: string };
export const singJWT = (payload: JWT_PAYLOAD, options?: SignOptions) => {
  return jwt.sign(payload, "JWT_SECRET", { expiresIn: "15m" });
};

export const verifyJWT = (token: string): JWT_PAYLOAD => {
  return jwt.verify(token, "JWT_SECRET") as JWT_PAYLOAD;
};
