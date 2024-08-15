import { Router } from "express";
import { select, insert, get, remove, update } from "../db/db.js";

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
  const sql =
    "INSERT INTO tasks (list_id, name, description, category) VALUES (?, ?, 'Description of Task 1', 'Category 1');";
  const params = [listID, taskName];
  const taskId = await insert(sql, params);
  if (!taskId) {
    throw new Error("Failed to create task");
  }
  const sql2 = "INSERT INTO task_history (task_id) VALUES(?);";
  const params2 = [taskId];
  await insert(sql2, params2);
  // taskQuery.rows[0].taskHistory = taskHistory.rows;
  // taskQuery.rows[0].completed = false;
  const sql3 = "SELECT * FROM tasks WHERE id = ?";
  const params3 = [taskId];
  const task = await get(sql3, params3);
  const sql4 = "SELECT * FROM task_history WHERE task_id = ?";
  const params4 = [taskId];
  const taskHistory = await select(sql4, params4);
  task.taskHistory = taskHistory;
  task.completed = false;
  return task;
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

// stopped here, need to convert to using helper functions
router.get("/read/:listId", async (req, res) => {
  const listId = req.params.listId;
  if (!listId || isNaN(parseInt(listId))) {
    return res.status(400).json({ error: "listId not valid" });
  }
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
    const sql = "SELECT * FROM tasks WHERE list_id=?;";
    const params = [listId];
    const rows = await select(sql, params);
    if (rows.length === 0) {
      return [];
    }
    return rows;
  } catch (error) {
    console.error(error);
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
    const sql =
      "SELECT * FROM task_history WHERE task_id = ? ORDER BY created_on DESC LIMIT 1";
    const params = [task.id];
    const history = get(sql, params);
    const newTask = {
      ...task,
      taskHistory: history ? [history] : [],
    };
    if (newTask.taskHistory.length === 0) {
      const sql = "INSERT INTO task_history (task_id) VALUES (?);";
      const params = [task.id];
      const newTaskOccurrenceId = await insert(sql, params);
      const sqlGet = "SELECT FROM task_history WHERE id = ?";
      const paramsGet = [newTaskOccurrenceId];
      const newOccurrence = await get(sqlGet, paramsGet);
      if (!newOccurrence) {
        throw new Error("failed to create newOccurrence");
      }
      newTask.taskHistory.unshift(newOccurrence);
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

async function handleRepeatingTask(task) {
  try {
    const [num, den] = task.frequency.split(":").map((number, index) => {
      if (index === 0) {
        return parseInt(number ?? "1");
      }
      return parseInt(number ?? "0");
    });

    const sql =
      "SELECT * FROM task_history WHERE task_id = ? ORDER BY created_on DESC LIMIT ?;";
    const params = [task.id, num];
    const history = await select(sql, params);

    const taskHistory = history ?? [];
    if (taskHistory.length === 0) {
      const sql = "INSERT INTO task_history (task_id) VALUES (?);";
      const params = [task.id];
      const newOccurrenceId = await insert(sql, params);
      const sqlGet = "SELECT FROM task_history WHERE id = ?";
      const paramsGet = [newOccurrenceId];
      const newOccurrence = await get(sqlGet, paramsGet);
      taskHistory.unshift(newOccurrence);
    }
    const today = Date.now() / MILLISECS_TO_DAYS;
    let mostRecentTaskDate =
      taskHistory[0].created_on.getTime() / MILLISECS_TO_DAYS;
    while (mostRecentTaskDate < today) {
      mostRecentTaskDate++;
      if (await activeDaysExhausted(taskHistory, num)) {
        mostRecentTaskDate += den;
      }
      if (mostRecentTaskDate > today) {
        break;
      }
      const difference = today - mostRecentTaskDate;
      const sql =
        "INSERT INTO task_history (task_id, created_on) VALUES (?, date('now', '-? days'))";
      const params = [taskHistory[0].task_id, difference];
      const newTaskOccurrenceId = await insert(sql, params);
      const sqlGet = "SELECT FROM task_history WHERE id = ?";
      const paramsGet = [newTaskOccurrenceId];
      const newTaskOccurrence = get(sqlGet, paramsGet);
      taskHistory.unshift(newTaskOccurrence);
    }
    // stopped here on August 15th
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
  return db.run(
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
  return db.run("UPDATE task_history SET completed=$1 WHERE id=$2", [
    completed,
    taskHistoryId,
  ]);
}

// unsure if it's working quite right
router.post("/pause/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = db.run(`UPDATE tasks
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
    const query = db.run(`DELETE from tasks WHERE id = ${id}`);
    res.json(query.rows);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
