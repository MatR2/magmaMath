import { UserRepository } from "../repository/userRepository";
import { CreateUserDto } from "../dto/createUserDTO";
import { UpdateUserDto } from "../dto/updateUserDTO";
import { IUser } from "../interfaces/iUser";
import { validate } from "class-validator";
import { APIError } from "../utils/apiError";

export class UserService {
  private repository: UserRepository;
  constructor() {
    this.repository = new UserRepository();
  }

  async CreateUser(data: CreateUserDto) {
    const errors = await validate(data);
    if (errors.length !== 0) {
      throw new APIError("Validation error", 400);
    }
    return await this.repository.CreateUser(data);
  }

  async GetUsers(page?: number, pageSize?: number) {
    return await this.repository.GetUsers(page, pageSize);
  }

  async GetUser(id: string) {
    return await this.repository.GetUserById(id);
  }

  async UpdateUser(id: string, data: UpdateUserDto) {
    const errors = await validate(data);
    if (errors.length !== 0) {
    }
    return await this.repository.UpdateUser(id, data);
  }

  async DeleteUser(id: string) {
    return await this.repository.DeleteUser(id);
  }
}
