import { User } from "../generated/prisma/client";
import { prisma } from "../services/prisma.service";

export class UserRepository {
  private prismaUser = prisma.user;

  findAll(): Promise<User[]> {
    return this.prismaUser.findMany();
  }

  findById(id: string): Promise<User | undefined> {
    return this.prismaUser.findUniqueOrThrow({ where: { id } });
  }

  create(
    data: Pick<User, "name" | "email" | "password" | "role">
  ): Promise<User> {
    const user: Omit<User, "id"> = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.prismaUser.create({ data: user });
  }

  update(
    id: string,
    data: Partial<Pick<User, "name" | "email" | "password">>
  ): Promise<User | null> {
    return this.prismaUser.update({
      where: { id },
      data: { name: data.name, email: data.email, password: data.password },
    });
  }

  delete(id: string): Promise<User | null> {
    return this.prismaUser.delete({ where: { id } });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.prismaUser.findUniqueOrThrow({ where: { email } });
  }
}
