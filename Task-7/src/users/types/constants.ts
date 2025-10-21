export const ROLES = {
  admin: "ADMIN",
  coach: "COACH",
  student: "STUDENT",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
