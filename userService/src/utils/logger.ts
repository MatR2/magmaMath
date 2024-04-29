import winston from "winston";
import path from "path";

const logPath = process.env.LOG_PATH || "./logs/";
const infoPath = path.join(logPath, "info.log");
const errorPath = path.join(logPath, "error.log");

const logFormat = winston.format.printf((info) => {
  return `[${info.timestamp}] [${info.service}] [${info.level}] ${info.message}`;
});

const logsConfig = (filename: string) => {
  return {
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      logFormat
    ),
    transports: [
      process.env.ENV !== "PROD"
        ? new winston.transports.Console()
        : new winston.transports.File({
            filename: filename,
            maxsize: 5242880, //5MB
            maxFiles: 100,
          }),
    ],
  };
};

const infoLogger = winston.createLogger({
  level: "info",
  ...logsConfig(infoPath),
});

const errorLogger = winston.createLogger({
  level: "error",
  ...logsConfig(errorPath),
});

export const logInfo = (message: string, service: string) => {
  infoLogger.info(message, { service: service });
};

export const logError = (message: string, service: string) => {
  errorLogger.error(message, { service: service });
};
