const { pool } = require("./db");

// installed body-parser

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

// in production the wild card is fine for ease
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  // ); // If needed
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "X-Requested-With,content-type"
  // ); // If needed
  // res.setHeader("Access-Control-Allow-Credentials", true); // If needed

  res.json({ serverMessage: "Hellooooooo World!" });
});

// toDoList = {
// title: string,
// toDos: [toDoItem]
// }

let toDoList = {
  title: "Test List",
  todos: [
    {
      name: "meditate",
      completed: false,
    },
    {
      name: "sleep",
      completed: false,
    },
    {
      name: "exercise",
      completed: false,
    },
  ],
};

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
    console.log(query);
    // ToDo upgrade repo to hold and display multiple lists
    const firstRow = query.rows[0];
    let workingList = {
      title: firstRow["title"],
      todos: toDos,
    };
    res.json(workingList);
  } catch (error) {
    console.error(error);
  }
});

app.post("/listItems", (req, res) => {
  toDoList = req.body;
  res.json({
    serverMessage: "data received",
    updatedList: toDoList,
  });
  console.log(toDoList);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// redo DB schema to be simpler
// remove list relationships table
// just use a foreign key
