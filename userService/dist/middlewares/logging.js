"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleware = void 0;
const logger_1 = require("../utils/logger");
const loggingMiddleware = (req, res, next) => {
    (0, logger_1.logInfo)(`${req.method}: ${req.baseUrl}`, "userService");
    next();
    (0, logger_1.logInfo)(`${res.statusCode}`, "userService");
};
exports.loggingMiddleware = loggingMiddleware;
//# sourceMappingURL=logging.js.map