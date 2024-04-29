import { Router, response } from "express";
import { pool } from "../models/db.js";

const router = Router();

//  accept description in UI

router.post("/add/:listID/:taskName", async (req, res) => {
  try {
    const listID = req.params.listID;
    const taskName = req.params.taskName;
    const response = await createTask(listID, taskName);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ serverMessage: error.message });
  }
});

export async function createTask(listID, taskName) {
  const taskQuery = await pool.query(
    `INSERT INTO tasks (list_id, name, description, category) VALUES
          ('${listID}', '${taskName}', 'Description of Task 1', 'Category 1') RETURNING *;`
  );
  const taskId = taskQuery.rows[0]?.id;
  if (!taskId) {
    throw new Error("Failed to create task");
  }
  const taskHistory = await pool.query(
    `INSERT INTO task_history (task_id) VALUES('${taskId}') RETURNING *;`
  );
  taskQuery.rows[0].taskHistory = taskHistory.rows;
  taskQuery.rows[0].completed = false;
  return taskQuery;
}

router.get("/read/:listId", async (req, res) => {
  const listId = req.params.listId;
  try {
    const query = await getTasks(listId);
    res.json(query);
  } catch (error) {
    console.log({ error }, " read/listId in tasks-controller");
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
  const query = await pool.query(
    `SELECT * FROM tasks WHERE list_id='${listId}';`
  );
  if (query.rowCount === 0) {
    return query.rows;
  }
  let tasks = [];
  for (const task of query.rows) {
    const taskId = task.id;
    const history = await pool.query(
      `SELECT * FROM task_history WHERE task_id = '${taskId}' ORDER BY created_on DESC;`
    );
    const newTask = {
      ...task,
      taskHistory: history.rows ?? [],
    };
    if (task.repeats) {
      // check if most recent is valid
      const isValid = isCurrent(history.rows[0]);
      if (!isValid) {
        const newOccurance = await pool.query(
          `INSERT INTO task_history (task_id) VALUES ('${taskId}') RETURNING *;`
        );
        newTask.taskHistory.unshift(newOccurance.rows[0]);
      }
    }
    newTask.completed = newTask.taskHistory[0]?.completed ?? false;
    tasks.push(newTask);
    //
    // post
    // const taskDate = parsePostgresDate(createdOn);
    // 2024-03-29 18:40:19.070107
    // const taskDate = new Date(history.rows[0].created_on);
    // console.log(taskDate.getDay(), " day");
  }
  return tasks;
}

function isCurrent(taskOccurance) {
  if (taskOccurance !== undefined) {
    const dateNow = new Date();
    const taskDate = taskOccurance.created_on;
    const equal =
      dateNow.getFullYear() === taskDate.getFullYear() &&
      dateNow.getMonth() === taskDate.getMonth() &&
      dateNow.getDate() === taskDate.getDate();
    return equal;
  }
  return false;
}

function parsePostgresDate(postgresDate) {
  const timeRemoved = postgresDate.split(" ")[0];
  const [year, month, day] = timeRemoved.split("-");
  const newDate = new Date();
  newDate.setFullYear(year, month, day);
  return newDate;
}

router.post("/saveChanges/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const body = req.body;
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

router.post("/update-completed", async (req, res) => {
  try {
    const { taskHistoryId, completed } = req.body;
    const query = await updateCompleted(completed, taskHistoryId);
    res.json(query.rows);
  } catch (error) {
    res
      .json({
        status: "error",
        message: error.message,
      })
      .status(400);
  }
});

export async function updateCompleted(completed, taskHistoryId) {
  return await pool.query("UPDATE task_history SET completed=$1 WHERE id=$2", [
    completed,
    taskHistoryId,
  ]);
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
