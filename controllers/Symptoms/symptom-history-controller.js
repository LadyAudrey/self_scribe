import { db } from "../../db/db.js";
import { Router } from "express";

const router = new Router();

router.post("/add", async (req, res) => {
  const symptomId = req.body.symptomId;
  const intensity = req.body.intensity;
  console.log({ symptomId, intensity }, req.body);
  try {
    if (!symptomId || !intensity) {
      throw new Error("symptomId or intensity missing");
    }
    const query = db.run(
      "INSERT INTO symptoms_history (symptom_id, intensity) VALUES ($1, $2) RETURNING *",
      [symptomId, intensity]
    );
    res.json(query.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
