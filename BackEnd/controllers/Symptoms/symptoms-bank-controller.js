import { pool } from "../../models/db.js";
import { Router } from "express";

const router = new Router();
router.get("/:userId", getSymptoms);

export async function getSymptoms(req, res) {
  const userId = req.params.userId;
  try {
    const symptoms = await pool.query(
      "SELECT * FROM symptoms WHERE user_id = $1",
      [userId]
    );
    res.json(symptoms.rows);
  } catch (error) {
    console.error(error);
  }
}

export default router;
