import { max } from "class-validator";
import User from "../model/user";
import { UpdateUserDto } from "../dto/updateUserDTO";
import { CreateUserDto } from "../dto/createUserDTO";
import { APIError } from "../utils/apiError";
import { logError } from "../utils/logger";

export class UserRepository {
  async CreateUser(createUserDto: CreateUserDto) {
    try {
      const newUser = await User.create(createUserDto);
      return newUser;
    } catch (e: any) {
      if (e.code === 11000) {
        throw new APIError("User with givenn email already exists", 400);
      }
      logError(e.message, "UserService");
      throw new APIError("Internal server error", 500);
    }
  }

  async GetUserById(id: string) {
    try {
      const user = await User.findById(id).exec();
      return user;
    } catch (e: any) {
      logError(e.message, "UserService");
      throw new APIError("Internal server error", 500);
    }
  }

  async GetUsers(page: number = 1, pageSize: number = 10) {
    try {
      if (page <= 0) {
        page = 1;
      }
      let offset = (page - 1) * pageSize;
      const collectionSize = await User.estimatedDocumentCount().exec();
      const maxPage = Math.ceil(collectionSize / pageSize);
      if (page > maxPage) {
        page = maxPage;
        offset = (maxPage - 1) * pageSize;
      }
      const users = await User.find().skip(offset).limit(pageSize).exec();

      return { maxPage: maxPage, page: page, users: users };
    } catch (e: any) {
      logError(e.message, "UserService");
      throw new APIError("Internal server error", 500);
    }
  }

  async UpdateUser(id: string, updateUserData: UpdateUserDto) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateUserData, {
        new: true,
      }).exec();

      return updatedUser;
    } catch (e: any) {
      logError(e.message, "UserService");
      throw new APIError("Internal server error", 500);
    }
  }

  async DeleteUser(id: string) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (e: any) {
      logError(e.message, "UserService");
      throw new APIError("Internal server error", 500);
    }
  }
}
