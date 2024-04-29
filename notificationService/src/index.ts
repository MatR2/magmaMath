import express from "express";
import { Consumer } from "./amqp/connection";
import { logUserServiceMessages } from "./amqp/handlers";
import healthRouter from "./routes/health";
import { logError, logInfo } from "./utils/logger";

const port = process.env.PORT || 3000;
const amqp = process.env.AMQP_ADDRESS || "amqp://localhost:5672";

async function StartServer() {
  try {
    const app = express();

    app.use(express.json());
    app.use("/health", healthRouter);
    const consumer = new Consumer(amqp, "user_service");
    await consumer.connect();
    await consumer.createQueue("user");
    await consumer.bindToQueue("user", "user.created");
    await consumer.bindToQueue("user", "user.deleted");
    consumer.listen("user", logUserServiceMessages);
    app.listen(port, async () => {
      logInfo(`Server listening on port ${port}`, "Notification");
    });
  } catch (error: any) {
    logError(error.message, "Notification");
    process.exit(1);
  }
}
StartServer();
