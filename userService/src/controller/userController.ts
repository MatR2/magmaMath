import { Request, Response } from "express";
import { UserService } from "../service/userService";
import { APIError } from "../utils/apiError";
import { CreateUserDto } from "../dto/createUserDTO";
import { plainToInstance } from "class-transformer";
import { UpdateUserDto } from "../dto/updateUserDTO";
import amqplib from "amqplib";
import { publishMessage } from "../amqp/connect";
import { logError } from "../utils/logger";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async CreateUser(req: Request, res: Response) {
    try {
      const data = plainToInstance(CreateUserDto, req.body);
      const user = await this.userService.CreateUser(data);
      await publishMessage("user.created", JSON.stringify(user));
      res.status(201).json(user);
    } catch (error: any) {
      logError(error);
      if (error instanceof APIError)
        res.status(error.errorCode).json({ message: error.message });
      else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async GetUsers(req: Request, res: Response) {
    try {
      const page = req.query.page
        ? parseInt(req.query.page as string)
        : undefined;
      const pageSize = req.query.pageSize
        ? parseInt(req.query.pageSize as string)
        : undefined;
      const users = await this.userService.GetUsers(page, pageSize);
      res.json(users);
    } catch (error: any) {
      logError(error);
      if (error instanceof APIError)
        res.status(error.errorCode).json({ message: error.message });
      else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async GetUserById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const users = await this.userService.GetUser(id);
      if (!users) {
        res.status(404).json({ message: "User does not exists" });
      } else {
        res.json(users);
      }
    } catch (error: any) {
      if (error instanceof APIError)
        res.status(error.errorCode).json({ message: error.message });
      else {
        logError(error.message);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async UpdateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = plainToInstance(UpdateUserDto, req.body);
      const users = await this.userService.UpdateUser(id, data);
      if (!users) {
        res.status(404).send();
      } else {
        res.status(204).send();
      }
    } catch (error: any) {
      if (error instanceof APIError)
        res.status(error.errorCode).json({ message: error.message });
      else {
        logError(error.message);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async DeleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await this.userService.DeleteUser(id);
      await publishMessage("user.deleted", JSON.stringify(user));
      res.status(204).json(user);
    } catch (error: any) {
      if (error instanceof APIError)
        res.status(error.errorCode).json({ message: error.message });
      else {
        logError(error.message);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
