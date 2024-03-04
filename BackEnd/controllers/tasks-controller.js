import { Router } from "express";
import { pool } from "../models/db.js";

const router = Router();

router.post("/add/:user/:listID/:taskName", async (req, res) => {
  try {
    // const userName = req.params.user;
    const listID = req.params.listID;
    console.log(listID);
    const taskName = req.params.taskName;
    const response = await pool.query(
      `INSERT INTO tasks (list_id, name, created_on, description, category) VALUES
            ('${listID}', '${taskName}', NOW(), 'Description of Task 1', 'Category 1') RETURNING *;`
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ serverMessage: error.message });
  }
});

router.get("/listId/read/:user", async (req, res) => {
  console.log("tasks-controller read is running");
  try {
    const query = await pool.query(
      `SELECT * FROM tasks WHERE list_id='${req.params.list_id}'`
    );
    res.json({
      user: req.params.user,
      lists: query.rows,
    });
  } catch (error) {
    console.log({ error }, " line 28 in tasks-controller");
  }
});

export default router;
