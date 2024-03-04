import { pool } from "./models/db.js";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = 3001;

// in production the wild card is fine for ease
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// handle routes here
import rootController from "./controllers/root-controller.js";
import listController from "./controllers/list-controller.js";
import tasksController from "./controllers/tasks-controller.js";

app.use("/", rootController);
app.use("/lists", listController);
app.use("/tasks", tasksController);

app.get("/listItems", async (req, res) => {
  try {
    const query = await pool.query("SELECT * FROM list");
    const listItemsQuery = await pool.query("SELECT * FROM list_item");
    const toDos = [];
    // refactor as a filter
    for (let i = 0; i < listItemsQuery.rows.length; i++) {
      toDos.push({
        name: listItemsQuery.rows[i].title,
        completed: listItemsQuery.rows[i].completed,
      });
    }
    // ToDo upgrade repo to hold and display multiple lists; 0 indexing will not be necessary
    const firstRow = query.rows[0];
    let workingList = [
      {
        title: firstRow["title"],
        todos: toDos,
      },
    ];
    res.json(workingList);
  } catch (error) {
    console.error(error);
  }
});

app.post("/listItems", (req, res) => {
  const toDoList = req.body;
  res.json({
    serverMessage: "data received",
    updatedList: toDoList,
  });
  console.log(toDoList + " line 94 in server");
});

// should stay at the bottom of the file
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
