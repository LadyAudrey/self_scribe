import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ serverMessage: getHello() });
});

export function getHello() {
  return "Hellooooooo World!";
}

export default router;
