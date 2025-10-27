import { createArgonHash } from "../../src/auth/util/argon.util";
import { prisma } from "../../src/services/prisma.service";

export const adminSeed = async () => {
  const password = await createArgonHash("admin123");
  await prisma.user.upsert({
    where: { email: "admin@no.com" },
    update: {},
    create: {
      email: "admin@no.com",
      password,
      role: "ADMIN",
      name: "Admin",
    },
  });
};
