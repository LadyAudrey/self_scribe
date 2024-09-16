import { insert, select, update, remove } from "../../db/db.js";
import { Router } from "express";

const router = new Router();

router.post("/add", async (req, res) => {
  const symptomId = req.body.symptomId;
  const intensity = req.body.intensity;
  const notes = req.body.notes;
  if (isNaN(parseInt(symptomId))) {
    return res.status(400).json({ error: "symptomId needs to be a number" });
  }
  if (isNaN(parseInt(intensity))) {
    return res.status(400).json({ error: "intensity needs to be a number" });
  }
  try {
    const sql =
      "INSERT INTO symptoms_history (symptom_id, intensity, notes) VALUES (?, ?, ?)";
    const params = [symptomId, intensity, notes ?? ""];
    const query = insert(sql, params);
    res.json({ id: query });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userId", getSymptomHistory);

export async function getSymptomHistory(req, res) {
  const userId = req.params.userId;
  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "user Id needs to be a number" });
  }
  try {
    const sql = "SELECT * FROM symptoms_history WHERE symptom_id = ?";
    const params = [userId];
    const query = await select(sql, params);
    res.json(query);
  } catch (error) {
    console.error(error);
  }
}

router.post("delete/:instanceId", removeInstance);

export async function removeInstance(req, res) {
  const instanceId = req.params.id;
  if (isNaN(parseInt(instanceId))) {
    return res.status(400).json({ error: "instance id needs to be a number" });
  }
  try {
    const sql = "DELETE FROM symptoms_history WHERE id = ?";
    const params = [instanceId];
    const query = await remove(sql, params);
    res.json(query);
  } catch (error) {
    console.error(error);
  }
}

export default router;
