import jwt, { SignOptions } from "jsonwebtoken";
import { getEnvOrThrow } from "../../utils/util";
import { RoleType } from "../../users/types/constants";

export type JWT_PAYLOAD = {
  sub: string;
  name: string;
  role: RoleType;
};

const JWT_SECRET = getEnvOrThrow("JWT_SECRET");

export const signJWT = (payload: JWT_PAYLOAD, options?: SignOptions) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const verifyJWT = (token: string): JWT_PAYLOAD => {
  return jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
};
