import { max } from "class-validator";
import User from "../model/user";
import { UpdateUserDto } from "../dto/updateUserDTO";
import { CreateUserDto } from "../dto/createUserDTO";
import { APIError } from "../utils/apiError";
import { logError } from "../utils/logger";

export class UserRepository {
  async CreateUser(createUserDto: CreateUserDto) {
    try {
      const user = await User.findOne({ email: createUserDto.email });

      const newUser = await User.create(createUserDto);
      return newUser;
    } catch (error: any) {
      logError(error.message, "UserService");
      if (error.code === 11000) {
        throw new APIError("User with givenn email already exists", 400);
      }
      throw new APIError("Internal server error", 500);
    }
  }

  async GetUserById(id: string) {
    try {
      const user = await User.findById(id).exec();
      if (!user) {
        throw new APIError("Not found", 404);
      }

      return user;
    } catch (e) {
      throw new APIError("Internal server error", 500);
    }
  }

  async GetUsers(page: number = 1, pageSize: number = 10) {
    try {
      let actuallPage = page - 1;
      if (actuallPage < 0) {
        actuallPage = 0;
      }
      const offset = actuallPage * pageSize;
      const collectionSize = await User.estimatedDocumentCount().exec();
      const maxPage = Math.ceil(collectionSize / pageSize);
      const users = await User.find().skip(offset).limit(pageSize).exec();

      return { maxPage: maxPage, page: actuallPage, users: users };
    } catch (error) {
      console.log(error);
      throw new APIError("Internal server error", 500);
    }
  }

  async UpdateUser(id: string, updateUserData: UpdateUserDto) {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateUserData, {
        new: true,
      }).exec();
      if (!updatedUser) {
        throw new APIError("Not found", 404);
      }
      return updatedUser;
    } catch (error) {
      throw new APIError("Internal server error", 500);
    }
  }

  async DeleteUser(id: string) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new APIError("Not found", 404);
      }
      return user;
    } catch (error) {
      throw new APIError("Internal server error", 500);
    }
  }
}