import { Router } from "express";
import { pool } from "../models/db.js";
import { select } from "../db/db.js";

const router = Router();

// modified to get items with specific task id instead of all of them
router.get("/read/:taskId", async (req, res) => {
  taskId = req.params.taskId;
  if (!taskId || isNaN(parseInt(taskId))) {
    return res.status(400).json({ error: "taskId not valid" });
  }
  try {
    const query = await getTaskHistory(taskId);
    res.json(query);
  } catch (error) {
    console.error({ error }, "read/taskId in task_history controller");
  }
});

export async function getTaskHistory(taskId) {
  try {
    const sql = "SELECT * FROM task_history WHERE task_id = ?";
    const params = [taskId];
    const taskHistory = await select(sql, params);
    if (taskHistory.rows === 0) {
      return [];
    }
    return taskHistory;
  } catch (error) {
    return [];
  }
}
