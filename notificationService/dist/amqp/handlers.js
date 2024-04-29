"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logUserServiceMessages = void 0;
const logUserServiceMessages = (msg) => {
    const key = msg.fields.routingKey;
    const data = JSON.parse(msg.content.toString());
    if (key === "user.created") {
        console.log(`Welcome ${data.name}`);
    }
    if (key === "user.deleted") {
        console.log(`Bye ${data.name}`);
    }
};
exports.logUserServiceMessages = logUserServiceMessages;
//# sourceMappingURL=handlers.js.map