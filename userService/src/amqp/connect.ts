import amqplib from "amqplib";

const address = process.env.AMQP_ADDRESS || "amqp://localhost:5672";
console.log(address);
let amqpInstance: amqplib.Connection | null = null;
let amqpChannel: amqplib.Channel | null = null;

const connect = async () => {
  try {
    amqpInstance = await amqplib.connect(address);
    amqpChannel = await amqpInstance.createChannel();
    await amqpChannel!.assertExchange("user_service", "direct", {
      durable: true,
    });
    console.log("Rabbitmq connected");
  } catch (error) {
    console.log("Rabbitmq connection error");
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
