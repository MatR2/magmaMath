import amqplib from "amqplib";
import { logInfo } from "../utils/logger";

const address = process.env.AMQP_ADDRESS || "amqp://localhost:5672";
let amqpInstance: amqplib.Connection | null = null;
let amqpChannel: amqplib.Channel | null = null;

const connect = async () => {
  try {
    amqpInstance = await amqplib.connect(address);
    amqpChannel = await amqpInstance.createChannel();
    await amqpChannel!.assertExchange("user_service", "direct", {
      durable: true,
    });
    logInfo("Rabbitmq connected", "User service");
  } catch (error) {
    logInfo("Rabbitmq connection error", "User service");
  }
};

export const getAmqpChannel = async () => {
  if (!amqpInstance) {
    await connect();

    return amqpChannel;
  }

  return amqpChannel;
};

export const publishMessage = async (topic: string, data: string) => {
  const channel = await getAmqpChannel();
  if (channel) {
    channel.publish("user_service", topic, Buffer.from(data));
  }
};
