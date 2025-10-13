import jwt, { SignOptions } from "jsonwebtoken";

export type JWT_PAYLOAD = {
  sub: string;
  name: string;
  role: "ADMIN" | "COACH" | "STUDENT";
};

const JWT_SECRET = "IAM_JWT_SECRET";
export const signJWT = (payload: JWT_PAYLOAD, options?: SignOptions) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

export const verifyJWT = (token: string): JWT_PAYLOAD => {
  return jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
};
