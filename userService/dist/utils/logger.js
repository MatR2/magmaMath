"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.logInfo = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const logPath = process.env.LOG_PATH || "./logs/";
const infoPath = path_1.default.join(logPath, "info.log");
const errorPath = path_1.default.join(logPath, "error.log");
const logFormat = winston_1.default.format.printf((info) => {
    return `[${info.timestamp}] [${info.service}] [${info.level}] ${info.message}`;
});
const logsConfig = (filename) => {
    return {
        format: winston_1.default.format.combine(winston_1.default.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }), logFormat),
        transports: [
            process.env.ENV !== "PROD"
                ? new winston_1.default.transports.Console()
                : new winston_1.default.transports.File({
                    filename: filename,
                    maxsize: 5242880, //5MB
                    maxFiles: 100,
                }),
        ],
    };
};
const infoLogger = winston_1.default.createLogger(Object.assign({ level: "info" }, logsConfig(infoPath)));
const errorLogger = winston_1.default.createLogger(Object.assign({ level: "error" }, logsConfig(errorPath)));
const logInfo = (message, service) => {
    infoLogger.info(message, { service: service });
};
exports.logInfo = logInfo;
const logError = (message, service) => {
    errorLogger.error(message, { service: service });
};
exports.logError = logError;
//# sourceMappingURL=logger.js.map