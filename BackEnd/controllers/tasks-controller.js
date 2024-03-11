import { Router } from "express";
import { pool } from "../models/db.js";

const router = Router();

router.post("/add/:user/:listID/:taskName", async (req, res) => {
  try {
    const userName = req.params.user;
    const listID = req.params.listID;
    console.log(listID);
    const taskName = req.params.taskName;
    const response = await pool.query(
      `INSERT INTO tasks (list_id, name, created_on, description, category, user_name) VALUES
            ('${listID}', '${taskName}', NOW(), 'Description of Task 1', 'Category 1', '${userName}') RETURNING *;`
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ serverMessage: error.message });
  }
});

router.get("/read/:listId", async (req, res) => {
  const listId = req.params.listId;
  try {
    const query = await pool.query(
      `SELECT * FROM tasks WHERE list_id='${listId}';`
    );
    res.json(query.rows);
  } catch (error) {
    console.log({ error }, " line 28 in tasks-controller");
  }
});

export default router;
