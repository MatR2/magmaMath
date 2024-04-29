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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = __importDefault(require("../model/user"));
const apiError_1 = require("../utils/apiError");
class UserRepository {
    CreateUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findOne({ email: createUserDto.email });
                const newUser = yield user_1.default.create(createUserDto);
                return newUser;
            }
            catch (error) {
                console.log(error);
                if (error.code === 11000) {
                    throw new apiError_1.APIError("User with givenn email already exists", 400);
                }
                throw new apiError_1.APIError("Internal server error", 500);
            }
        });
    }
    GetUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(id).exec();
                if (!user) {
                    throw new apiError_1.APIError("Not found", 404);
                }
                return user;
            }
            catch (e) {
                throw new apiError_1.APIError("Internal server error", 500);
            }
        });
    }
    GetUsers() {
        return __awaiter(this, arguments, void 0, function* (page = 1, pageSize = 10) {
            try {
                let actuallPage = page - 1;
                if (actuallPage < 0) {
                    actuallPage = 0;
                }
                const offset = actuallPage * pageSize;
                const collectionSize = yield user_1.default.estimatedDocumentCount().exec();
                const maxPage = Math.ceil(collectionSize / pageSize);
                const users = yield user_1.default.find().skip(offset).limit(pageSize).exec();
                return { maxPage: maxPage, page: actuallPage, users: users };
            }
            catch (error) {
                console.log(error);
                throw new apiError_1.APIError("Internal server error", 500);
            }
        });
    }
    UpdateUser(id, updateUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_1.default.findByIdAndUpdate(id, updateUserData, {
                    new: true,
                }).exec();
                if (!updatedUser) {
                    throw new apiError_1.APIError("Not found", 404);
                }
                return updatedUser;
            }
            catch (error) {
                throw new apiError_1.APIError("Internal server error", 500);
            }
        });
    }
    DeleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findByIdAndDelete(id);
                if (!user) {
                    throw new apiError_1.APIError("Not found", 404);
                }
                return user;
            }
            catch (error) {
                throw new apiError_1.APIError("Internal server error", 500);
            }
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map