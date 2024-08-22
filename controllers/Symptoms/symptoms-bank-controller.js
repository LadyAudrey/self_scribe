import { insert, remove, select, update } from "../../db/db.js";
import { Router } from "express";

const router = new Router();
// all these routes are prepended with /symptoms/bank
router.get("/:userId", getSymptoms);

export async function getSymptoms(req, res) {
  const userId = req.params.userId;
  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "user Id needs to be a number" });
  }
  try {
    const sql = "SELECT * FROM symptoms WHERE user_id = ?";
    const params = [userId];
    const symptoms = await select(sql, params);
    res.json(symptoms);
  } catch (error) {
    console.error(error);
  }
}

router.post("/create", addSymptom);
export async function addSymptom(req, res) {
  const { userId, name, description, category } = req.body;
  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: "user Id needs to be a number" });
  }
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  try {
    const sql =
      "INSERT INTO symptoms (user_id, name, description, category) VALUES(?, ?, ?, ?)";
    const params = [userId, name, description, category];
    const query = await insert(sql, params);
    res.json(query);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "unable to create symptom", error: error.message });
  }
}

// make sure to pass *all* necessary pieces, even if not updated in the UI
router.post("/edit", editSymptom);
export async function editSymptom(req, res) {
  const { id, name, category, description } = req.body;
  if (!name) {
    res.status(400).json({ error: "name missing" });
    return;
  }
  if (isNaN(parseInt(id))) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  try {
    const sql =
      "UPDATE symptoms SET name=?, description=?, category=?  WHERE id = ?";
    const params = [name, description, category, id];
    const query = await update(sql, params);
    res.json(query);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      serverMessage: "There was an error",
      errorMessage: error.message,
    });
  }
}

router.post("/delete", deleteSymptom);
export async function deleteSymptom(req, res) {
  const symptomId = req.body.id;
  if (!symptomId || isNaN(parseInt(symptomId))) {
    res.status(400).json({ error: "invalid id" });
  }
  try {
    const sql = "DELETE FROM symptoms WHERE id = ?";
    const params = [symptomId];
    const query = await remove(sql, params);
    res.json(query);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      serverMessage: "There was an error",
      errorMessage: error.message,
    });
  }
}

export default router;
