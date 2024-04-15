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
  const task = await pool.query(
    `INSERT INTO tasks (list_id, name, description, category) VALUES
          ('${listID}', '${taskName}', 'Description of Task 1', 'Category 1') RETURNING *;`
  );
  const taskId = task.rows[0]?.id;
  if (!taskId) {
    throw new Error("Failed to create task");
  }
  return await pool.query(
    `INSERT INTO task_history (task_id) VALUES('${taskId}') RETURNING *;`
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

/*{
  "id": 1,
  "list_id": 1,
  "name": "testing",
  "created_on": "2024-03-28T15:55:17.284Z",
  "last_updated": "2024-03-28T15:55:17.284Z",
  "description": "Description of Task 1",
  "category": "category2",
  "completed": false,
  "repeats": true,
  "frequency": "010",
  "last_occurrence": "2024-04-04T15:53:17.909Z"
}*/

// finish aggregating data of task_history into the task item that is sent to FE

export async function getTasks(listId) {
  const tasks = await pool.query(
    `SELECT * FROM tasks WHERE list_id='${listId}';`
  );
  for (const task of tasks.rows) {
    console.log(task);
  }
  return tasks;
}

router.post("/saveChanges/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const body = req.body;
  console.log(req.body);
  try {
    const query = await saveChanges(taskId, body);
    res.json(query.rows);
  } catch (error) {
    console.log(error);
    res
      .json({
        status: "error",
        message: error.message,
      })
      .status(400);
  }
});

export async function saveChanges(id, body) {
  return await pool.query(
    `UPDATE tasks SET name='${body.name}', category='${body.category}', repeats='${body.repeats}', frequency='${body.frequency}' WHERE id='${id}';`
  );
}

// unsure if it's working quite right
router.post("/pause/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = await pool.query(`UPDATE tasks
    SET repeats = CASE
      WHEN repeats = TRUE THEN FALSE
      ELSE TRUE
      END
  WHERE id=${id};`);
  } catch (error) {}
});

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
