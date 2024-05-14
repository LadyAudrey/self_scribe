import { Router } from "express";
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
router.get("/read/:listId", async (req, res) => {
  const listId = req.params.listId;
  try {
    const query = await getTasks(listId);
    res.json(query);
  } catch (error) {
    console.log({ error }, " read/listId in tasks-controller");
  }
});

export async function getTasks(listId) {
  const tasks = await getTasksFromDB(listId);
  return await Promise.all(tasks.map(prepareTaskHistory));
}

async function getTasksFromDB(listId) {
  try {
    const query = await pool.query(
      `SELECT * FROM tasks WHERE list_id='${listId}';`
    );
    if (query.rowCount === 0) {
      return [];
    }
    return query.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// TODO: break this function down to smaller helper functions
// TODO: denest code with a gaurd statement on task.repeats, to create 2 paths
async function prepareTaskHistory(task) {
  const taskId = task.id;
  let limit = 1;
  if (!task.repeats) {
    return await handleNotRepeatingTask(task);
  }
  if (task.repeats) {
    const frequency = task.frequency.split(":");
    // accessing numerator #, we don't need denominator for past-propegation
    limit = parseInt(frequency[0]);
  }
  const history = await pool.query(
    `SELECT * FROM task_history WHERE task_id = '${taskId}' ORDER BY created_on DESC LIMIT ${limit};`
  );
  const newTask = {
    ...task,
    taskHistory: history.rows ?? [],
  };
  if (task.repeats && newTask.taskHistory.length === 0) {
    const newOccurance = await pool.query(
      `INSERT INTO task_history (task_id) VALUES ('${taskId}') RETURNING *;`
    );
    newTask.taskHistory.unshift(newOccurance.rows[0]);
    newTask.completed = false;
    return newTask;
  }
  if (task.repeats) {
    // check if most recent is valid
    const isValid = isCurrent(history.rows[0]);
    if (!isValid) {
      const newOccurance = await pool.query(
        `INSERT INTO task_history (task_id) VALUES ('${taskId}') RETURNING *;`
      );
      newTask.taskHistory.unshift(newOccurance.rows[0]);
      // TODO: set up back-propagation for cl not logging in for several days
      // TODO: set up algo to validate cycle over active + inactive days (greedy algo)
      // TODO: set up reminder if active day has not been interacted for the inactive days, put task into UI
    }
  }
  newTask.completed = newTask.taskHistory[0]?.completed ?? false;
  return newTask;
}

async function handleNotRepeatingTask(task) {
  try {
    const history = await pool.query(
      `SELECT * FROM task_history WHERE task_id = '${task.id}' ORDER BY created_on DESC LIMIT 1;`
    );
    if (!history) {
      throw new Error("failed to fetch taskHistory");
    }
    const newTask = {
      ...task,
      taskHistory: history.rows ?? [],
    };
    if (newTask.taskHistory.length === 0) {
      const newOccurance = await pool.query(
        `INSERT INTO task_history (task_id) VALUES ('${task.id}') RETURNING *;`
      );
      if (!newOccurance) {
        throw new Error("failed to create newOccurance");
      }
      newTask.taskHistory.unshift(newOccurance.rows[0]);
    }
    newTask.completed = newTask.taskHistory[0]?.completed ?? false;
    return newTask;
  } catch (error) {
    console.error(error);
    return {
      ...task,
      completed: false,
      taskHistory: [],
    };
  }
}

// this is where we stopped on 5.13
async function handleRepeatingTask(task) {
  const [num, den] = task.frequency.split(":").map((number) => {
    return parseInt(number ?? "1");
  });
  const history = await pool.query(
    `SELECT * FROM task_history WHERE task_id = '${task.id}' ORDER BY created_on DESC LIMIT ${num};`
  );
  const taskHistory = history.rows ?? [];
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

router.post("/saveChanges/:taskId", async (req, res) => {
  const taskId = req.params.taskId;
  const body = req.body;
  try {
    if (body.repeats && !body.frequency) {
      throw new Error("repeat requires a frequency");
    }
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
