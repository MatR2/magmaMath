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
const express_1 = __importDefault(require("express"));
const connection_1 = require("./amqp/connection");
const handlers_1 = require("./amqp/handlers");
const port = process.env.PORT || 3000;
const amqp = process.env.AMQP_ADDRESS || "amqp://localhost:5672";
function StartServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = (0, express_1.default)();
            app.use(express_1.default.json());
            const consumer = new connection_1.Consumer(amqp, "user_service");
            yield consumer.connect();
            yield consumer.createQueue("user");
            yield consumer.bindToQueue("user", "user.created");
            yield consumer.bindToQueue("user", "user.deleted");
            consumer.listen("user", handlers_1.logUserServiceMessages);
            app.listen(port, () => __awaiter(this, void 0, void 0, function* () {
                console.log("All good");
            }));
        }
        catch (error) {
            process.exit(1);
        }
    });
}
StartServer();
//# sourceMappingURL=index.js.map