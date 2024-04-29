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
const userRouter_1 = __importDefault(require("./router/userRouter"));
const health_1 = __importDefault(require("./router/health"));
const connection_1 = __importDefault(require("./db/connection"));
const connect_1 = require("./amqp/connect");
const logging_1 = require("./middlewares/logging");
const logger_1 = require("./utils/logger");
function StartServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const app = (0, express_1.default)();
            const PORT = process.env.PORT || 3000;
            yield (0, connect_1.getAmqpChannel)();
            yield (0, connection_1.default)();
            app.use(express_1.default.json());
            app.use(logging_1.loggingMiddleware);
            app.use("/", userRouter_1.default);
            app.use("/health", health_1.default);
            app.listen(PORT, () => {
                (0, logger_1.logInfo)(`Service running on http://localhost:${PORT}`);
            });
        }
        catch (error) {
            (0, logger_1.logError)(error.message);
            process.exit(1);
        }
    });
}
process.on("uncaughtException", (error) => {
    (0, logger_1.logError)(error.message);
});
StartServer();
//# sourceMappingURL=index.js.map