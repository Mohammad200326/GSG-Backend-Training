import { User } from "./user.entity";
import { UserModel } from "./user.model";

class UserRepository {
  findAll(page: number, limit: number) {
    const users = UserModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalRecords = UserModel.countDocuments().exec();

    return { users, totalRecords };
  }

  findById(id: string): Promise<User | null> {
    return UserModel.findById(id).exec();
  }

  create(
    data: Pick<User, "name" | "email" | "password" | "role">
  ): Promise<User> {
    return UserModel.create(data);
  }

  update(
    id: string,
    data: Partial<Pick<User, "name" | "email" | "password">>
  ): Promise<User | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  delete(id: string): Promise<User | null> {
    return UserModel.findByIdAndDelete(id);
  }

  findByEmail(email: string) {
    return UserModel.findOne({ email }).exec();
  }
}

export const userRepository = new UserRepository();
