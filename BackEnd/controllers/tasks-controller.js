import { Router, response } from "express";
import { pool } from "../models/db.js";

const router = Router();

//  accept description in UI

router.post("/add/:listID/:taskName", async (req, res) => {
  try {
    const listID = req.params.listID;
    const taskName = req.params.taskName;
    const response = await createTask(listID, taskName);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ serverMessage: error.message });
  }
});

export async function createTask(listID, taskName) {
  return await pool.query(
    `INSERT INTO tasks (list_id, name, description, category) VALUES
          ('${listID}', '${taskName}', 'Description of Task 1', 'Category 1') RETURNING *;`
  );
}

router.get("/read/:listId", async (req, res) => {
  const listId = req.params.listId;
  try {
    const query = await getTasks(listId);
    res.json(query.rows);
  } catch (error) {
    console.log({ error }, " line 28 in tasks-controller");
  }
});

export async function getTasks(listId) {
  return await pool.query(`SELECT * FROM tasks WHERE list_id='${listId}';`);
}

router.post("/edit/:taskId/:taskName", async (req, res) => {
  const taskId = req.params.taskId;
  const taskName = req.params.taskName;
  try {
    const query = await editTask(taskId, taskName);
    res.json(query.rows);
  } catch (error) {
    console.log(error);
  }
});

export async function editTask(id, newName) {
  return await pool.query(
    `UPDATE tasks SET name = '${newName}' WHERE id = ${id};`
  );
}

router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = await pool.query(`DELETE from tasks WHERE id = ${id}`);
    res.json(query.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
