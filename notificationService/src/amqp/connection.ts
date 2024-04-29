import amqplib from "amqplib";

export class Consumer {
  private amqpInstance: amqplib.Connection;
  private amqpChannel: amqplib.Channel;
  private amqpAddres: string;
  private exchange: string;

  constructor(adress: string, exchange: string) {
    this.amqpAddres = adress;
    this.exchange = exchange;
  }

  async connect() {
    try {
      this.amqpInstance = await amqplib.connect(this.amqpAddres);
      this.amqpChannel = await this.amqpInstance.createChannel();
      await this.amqpChannel.assertExchange(this.exchange, "direct", {
        durable: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createQueue(queueName: string) {
    await this.amqpChannel.assertQueue(queueName, { durable: true });
  }

  async bindToQueue(queueName: string, topic: string) {
    await this.amqpChannel.bindQueue(queueName, this.exchange, topic);
  }

  listen(queue: string, cb: (msg: amqplib.ConsumeMessage) => void) {
    this.amqpChannel.consume(
      queue,
      (msg) => {
        if (msg) {
          cb(msg);
          this.amqpChannel.ack(msg);
        }
      },
      { noAck: false }
    );
  }
}
