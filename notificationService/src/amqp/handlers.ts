import amqplib from "amqplib";

export const logUserServiceMessages = (msg: amqplib.ConsumeMessage) => {
  const key = msg.fields.routingKey;
  const data = JSON.parse(msg.content.toString());
  if (key === "user.created") {
    console.log(`Welcome ${data.name}`);
  }
  if (key === "user.deleted") {
    console.log(`Bye ${data.name}`);
  }
};
