import { prisma } from "../../src/services/prisma.service";
import { adminSeed } from "./adminUser";
import { usersSeed } from "./user.seed";

const main = async () => {
  await adminSeed();
  await usersSeed();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
