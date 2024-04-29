"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    try {
        res.json({ message: "ok" });
    }
    catch (e) {
        res.status(500).json({ message: "error" });
    }
});
exports.default = router;
//# sourceMappingURL=health.js.map