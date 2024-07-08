import { Router } from "express";
import symptomsBankController from "./symptoms-bank-controller.js";
import symptomsHistoryController from "./symptom-history-controller.js";

const router = new Router();

router.use("/bank", symptomsBankController);
router.use("/history", symptomsHistoryController);

export default router;
