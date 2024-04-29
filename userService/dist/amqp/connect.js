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
exports.publishMessage = exports.getAmqpChannel = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const address = process.env.AMQP_ADDRESS || "amqp://localhost:5672";
console.log(address);
let amqpInstance = null;
let amqpChannel = null;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        amqpInstance = yield amqplib_1.default.connect(address);
        amqpChannel = yield amqpInstance.createChannel();
        yield amqpChannel.assertExchange("user_service", "direct", {
            durable: true,
        });
        console.log("Rabbitmq connected");
    }
    catch (error) {
        console.log("Rabbitmq connection error");
    }
});
const getAmqpChannel = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!amqpInstance) {
        yield connect();
        return amqpChannel;
    }
    return amqpChannel;
});
exports.getAmqpChannel = getAmqpChannel;
const publishMessage = (topic, data) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield (0, exports.getAmqpChannel)();
    if (channel) {
        channel.publish("user_service", topic, Buffer.from(data));
    }
});
exports.publishMessage = publishMessage;
//# sourceMappingURL=connect.js.map