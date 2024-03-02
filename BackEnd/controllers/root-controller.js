import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ serverMessage: "Hellooooooo World!" });
});

export default router;
