import { NextFunction, Request, Response } from "express";
import { logInfo } from "../utils/logger";

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logInfo(`${req.method}: ${req.baseUrl}`, "userService");
  next();
  logInfo(`${res.statusCode}`, "userService");
};
