import express from "express";
import userRouter from "./router/userRouter";
import healthRouter from "./router/health";
import connectDB from "./db/connection";
import { getAmqpChannel } from "./amqp/connect";
import { loggingMiddleware } from "./middlewares/logging";
import { logInfo } from "./utils/logger";
import { SERVICE_NAME } from "./utils/const";

async function StartServer() {
  try {
    const app = express();
    const PORT = process.env.PORT || 3000;
    await getAmqpChannel();
    await connectDB();
    app.use(express.json());
    app.use(loggingMiddleware);
    app.use("/", userRouter);
    app.use("/health", healthRouter);
    app.listen(PORT, () => {
      logInfo(`Service running on http://localhost:${PORT}`, SERVICE_NAME);
    });
  } catch (error: any) {
    process.exit(1);
  }
}

StartServer();
