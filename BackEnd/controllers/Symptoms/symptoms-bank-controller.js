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

export async function addSymptom(req, res) {
  const { userId, name, description, category } = req.body;
  if (!userId) {
    res.status(400).json({
      message: "userId is invalid",
    });
    return;
  }
  if (!name) {
    res.status(400).json({
      message: "name is required",
    });
    return;
  }
  try {
    const query = await pool.query(
      "INSERT INTO symptoms (user_id, name, description, category) VALUES($1, $2, $3, $4) RETURNING *",
      [userId, name, description, category]
    );
    res.json(query.rows[0]);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "unable to create symptom", error: error.message });
  }
}

export default router;
