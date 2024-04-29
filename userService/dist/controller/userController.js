"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../service/userService");
const apiError_1 = require("../utils/apiError");
const createUserDTO_1 = require("../dto/createUserDTO");
const class_transformer_1 = require("class-transformer");
const updateUserDTO_1 = require("../dto/updateUserDTO");
const connect_1 = require("../amqp/connect");
class UserController {
    constructor() {
        this.userService = new userService_1.UserService();
    }
    CreateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = (0, class_transformer_1.plainToInstance)(createUserDTO_1.CreateUserDto, req.body);
                const user = yield this.userService.CreateUser(data);
                yield (0, connect_1.publishMessage)("user.created", JSON.stringify(user));
                res.status(201).json(user);
            }
            catch (error) {
                console.log(error);
                if (error instanceof apiError_1.APIError)
                    res.status(error.errorCode).json({ message: error.message });
                else {
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        });
    }
    GetUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.query.page
                    ? parseInt(req.query.page)
                    : undefined;
                const pageSize = req.query.pageSize
                    ? parseInt(req.query.pageSize)
                    : undefined;
                const users = yield this.userService.GetUsers(page, pageSize);
                res.json(users);
            }
            catch (error) {
                console.log(error);
                if (error instanceof apiError_1.APIError)
                    res.status(error.errorCode).json({ message: error.message });
                else {
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        });
    }
    GetUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const users = yield this.userService.GetUser(id);
                if (!users) {
                    res.status(404).json({ message: "User does not exists" });
                }
                else {
                    res.json(users);
                }
            }
            catch (error) {
                if (error instanceof apiError_1.APIError)
                    res.status(error.errorCode).json({ message: error.message });
                else {
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        });
    }
    UpdateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = (0, class_transformer_1.plainToInstance)(updateUserDTO_1.UpdateUserDto, req.body);
                const users = yield this.userService.UpdateUser(id, data);
                if (!users) {
                    res.status(404).send();
                }
                else {
                    res.status(204).send();
                }
            }
            catch (error) {
                if (error instanceof apiError_1.APIError)
                    res.status(error.errorCode).json({ message: error.message });
                else {
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        });
    }
    DeleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const user = yield this.userService.DeleteUser(id);
                yield (0, connect_1.publishMessage)("user.deleted", JSON.stringify(user));
                res.status(204).json(user);
            }
            catch (error) {
                if (error instanceof apiError_1.APIError)
                    res.status(error.errorCode).json({ message: error.message });
                else {
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map