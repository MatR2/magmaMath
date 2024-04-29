"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
const userController = new userController_1.UserController();
router.get("/users", (req, res) => {
    userController.GetUsers(req, res);
});
router.post("/user/create", (req, res) => {
    userController.CreateUser(req, res);
});
router.get("/user/:id", (req, res) => {
    userController.GetUserById(req, res);
});
router.patch("/user/:id", (req, res) => {
    userController.UpdateUser(req, res);
});
router.delete("/user/:id", (req, res) => {
    userController.DeleteUser(req, res);
});
exports.default = router;
//# sourceMappingURL=userRouter.js.map