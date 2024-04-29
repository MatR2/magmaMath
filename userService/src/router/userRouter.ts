import { Request, Response, Router } from "express";
import { UserController } from "../controller/userController";

const router = Router();
const userController = new UserController();
router.get("/users", (req: Request, res: Response) => {
  userController.GetUsers(req, res);
});
router.post("/user/create", (req: Request, res: Response) => {
  userController.CreateUser(req, res);
});
router.get("/user/:id", (req: Request, res: Response) => {
  userController.GetUserById(req, res);
});
router.patch("/user/:id", (req: Request, res: Response) => {
  userController.UpdateUser(req, res);
});
router.delete("/user/:id", (req: Request, res: Response) => {
  userController.DeleteUser(req, res);
});

export default router;
