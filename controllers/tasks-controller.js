import { Router } from "express";
import { pool } from "../models/db.js";

const router = Router();

const MILLISECS_TO_DAYS = 1000 * 60 * 60 * 24;

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
  console.log(tasks, "getTasks");
  return await Promise.all(tasks.map(prepareTaskHistory));
}

async function getTasksFromDB(listId) {
  console.log("entering getTasksFromDB");
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

async function prepareTaskHistory(task) {
  if (!task.repeats) {
    return await handleNotRepeatingTask(task);
  }
  return await handleRepeatingTask(task);
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

// 6/24 BUG TODO generates an extra day on the first sequence during back propagation
// test with more frequencies (we know 2:5 created 3 days on the first cycle)
// set up unit tests, but needs function to clear and create DB
async function handleRepeatingTask(task) {
  try {
    const [num, den] = task.frequency.split(":").map((number, index) => {
      if (index === 0) {
        return parseInt(number ?? "1");
      }
      return parseInt(number ?? "0");
    });

    const history = await pool.query(
      `SELECT * FROM task_history WHERE task_id = '${task.id}' ORDER BY created_on DESC LIMIT ${num};`
    );
    const taskHistory = history.rows ?? [];
    if (taskHistory.length === 0) {
      const newOccurance = await pool.query(
        `INSERT INTO task_history (task_id) VALUES ('${task.id}') RETURNING *;`
      );
      taskHistory.unshift(newOccurance.rows[0]);
    }
    // this may create bugs bc of using server time
    const today = Date.now() / MILLISECS_TO_DAYS;
    let mostRecentTaskDate =
      taskHistory[0].created_on.getTime() / MILLISECS_TO_DAYS;
    while (mostRecentTaskDate < today) {
      mostRecentTaskDate++;
      if (await activeDaysExhausted(taskHistory, num)) {
        // makes inactiveDaysExhausted obsolete
        mostRecentTaskDate += den;
      }
      if (mostRecentTaskDate > today) {
        break;
      }
      const difference = today - mostRecentTaskDate;
      console.log("entering handleRepeatingTask insert");
      const query = await pool.query(
        `INSERT INTO task_history (task_id, created_on) VALUES('${taskHistory[0].task_id}', NOW() - INTERVAL '${difference}' day) RETURNING *;`
      );
      taskHistory.unshift(query.rows[0]);
    }
    return {
      ...task,
      taskHistory,
      completed: taskHistory[0]?.completed ?? false,
    };
  } catch (error) {
    console.error(error);
    return {
      ...task,
      taskHistory: [],
      completed: false,
    };
  }
}

// TODO refactor for maintenance by future Devs
// returns a boolean of if the active days are exhausted (more than Num) *AND* adds to the db
async function activeDaysExhausted(taskHistory, activeDays) {
  if (taskHistory.length === 0) {
    return false;
  }
  const dateNow = Math.trunc(Date.now() / MILLISECS_TO_DAYS);
  const mostRecentTaskDate = Math.trunc(
    taskHistory[0].created_on.getTime() / MILLISECS_TO_DAYS
  );
  let allDaysExhausted = false;
  let count = 1;
  while (!allDaysExhausted) {
    const nextMostRecent = taskHistory[count];
    if (!nextMostRecent) {

      break;
    }
    const nextMostRecentDate = Math.trunc(
      nextMostRecent.created_on.getTime() / MILLISECS_TO_DAYS
    );
    if (count >= activeDays) {
      allDaysExhausted = true;
    }
    if (nextMostRecentDate + count === mostRecentTaskDate) {
      count++;
      continue;
    }
    break;
  }
  if (dateNow <= mostRecentTaskDate) {
    return true;
  }
  return allDaysExhausted;
}

function inactiveDaysExhausted(taskHistory, inactiveDays) {
  if (taskHistory.length === 0) {
    // true might be the better default, pending future logic
    return false;
  }
  const dateNow = Math.trunc(Date.now() / MILLISECS_TO_DAYS);
  const mostRecentTaskDate = Math.trunc(
    taskHistory[0].created_on.getTime() / MILLISECS_TO_DAYS
  );
  const difference = dateNow - mostRecentTaskDate;
  return difference > inactiveDays;
}

function isCurrent(taskOccurance) {
  if (taskOccurance !== undefined) {
    const today = Math.trunc(Date.now() / MILLISECS_TO_DAYS);
    const taskDay = Math.trunc(
      taskOccurance.created_on.getTime() / MILLISECS_TO_DAYS
    );
    return today === taskDay;
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
