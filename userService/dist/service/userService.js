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
exports.UserService = void 0;
const userRepository_1 = require("../repository/userRepository");
const class_validator_1 = require("class-validator");
const apiError_1 = require("../utils/apiError");
class UserService {
    constructor() {
        this.repository = new userRepository_1.UserRepository();
    }
    CreateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(data);
            if (errors.length !== 0) {
                throw new apiError_1.APIError("Validation error", 400);
            }
            return yield this.repository.CreateUser(data);
        });
    }
    GetUsers(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.GetUsers(page, pageSize);
        });
    }
    GetUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.GetUserById(id);
        });
    }
    UpdateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, class_validator_1.validate)(data);
            if (errors.length !== 0) {
            }
            return yield this.repository.UpdateUser(id, data);
        });
    }
    DeleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.DeleteUser(id);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map