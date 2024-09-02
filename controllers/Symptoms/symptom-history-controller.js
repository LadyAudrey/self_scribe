import { insert } from "../../db/db.js";
import { Router } from "express";

const router = new Router();

router.post("/add", async (req, res) => {
  const symptomId = req.body.symptomId;
  const intensity = req.body.intensity;
  if (isNaN(parseInt(symptomId))) {
    return res.status(400).json({ error: "symptomId needs to be a number" });
  }
  if (isNaN(parseInt(intensity))) {
    return res.status(400).json({ error: "intensity needs to be a number" });
  }
  try {
    const sql =
      "INSERT INTO symptoms_history (symptom_id, intensity) VALUES (?, ?)";
    const params = [symptomId, intensity];
    const query = insert(sql, params);
    res.json(query);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", getSymptoms);

export async function getSymptoms(req, res) {
  const userId = req.params.userId;
  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "user Id needs to be a number" });
  }
  try {
    const sql = "SELECT * FROM symptoms_history WHERE user_id = ?";
    const params = [userId];
    const query = await select(sql, params);
    res.json(query);
  } catch (error) {
    console.error(error);
  }
}

export default router;
