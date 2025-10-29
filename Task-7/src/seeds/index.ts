import { createArgonHash } from "../auth/util/argon.util";
import { UserModel } from "../users/user.model";

export const seedAdmin = async () => {
  const existingAdmin = await UserModel.findOne({ role: "ADMIN" });
  if (existingAdmin) return;

  const hashedPassword = await createArgonHash("admin123");

  await UserModel.create({
    name: "Admin",
    email: "admin@no.com",
    password: hashedPassword,
    role: "ADMIN",
  });
};
