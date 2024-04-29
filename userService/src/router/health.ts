import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  try {
    res.json({ message: "ok" });
  } catch (e) {
    res.status(500).json({ message: "error" });
  }
});

export default router;
