"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const logger_1 = require("../utils/logger");
class Consumer {
    constructor(adress, exchange) {
        this.amqpAddres = adress;
        this.exchange = exchange;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.amqpInstance = yield amqplib_1.default.connect(this.amqpAddres);
                this.amqpChannel = yield this.amqpInstance.createChannel();
                yield this.amqpChannel.assertExchange(this.exchange, "direct", {
                    durable: true,
                });
            }
            catch (error) {
                (0, logger_1.logError)(error.message, "Notification");
            }
        });
    }
    createQueue(queueName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.amqpChannel.assertQueue(queueName, { durable: true });
        });
    }
    bindToQueue(queueName, topic) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.amqpChannel.bindQueue(queueName, this.exchange, topic);
        });
    }
    listen(queue, cb) {
        this.amqpChannel.consume(queue, (msg) => {
            if (msg) {
                cb(msg);
                this.amqpChannel.ack(msg);
            }
        }, { noAck: false });
    }
}
exports.Consumer = Consumer;
//# sourceMappingURL=connection.js.map