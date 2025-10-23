import argon2 from "argon2";

export const createArgonHash = (value: string) => {
  return argon2.hash(value);
};

export const verifyArgonHash = (value: string, hashedValue: string) => {
  return argon2.verify(hashedValue, value);
};
