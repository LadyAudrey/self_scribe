const { pool } = require("./db");

// installed body-parser

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

// in production the wild card is fine for ease
app.use(cors({ origin: "http://localhost:5173" }));
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

let toDoList = [
  {
    title: "First List",
    todos: [
      {
        name: "meditate",
        completed: false,
      },
      {
        name: "exercise",
        completed: false,
      },
    ],
  },
  {
    title: "Second List",
    todos: [
      {
        name: "2meditate",
        completed: false,
      },
      {
        name: "2exercise",
        completed: false,
      },
    ],
  },
];

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
  toDoList = req.body;
  res.json({
    serverMessage: "data received",
    updatedList: toDoList,
  });
  console.log(toDoList + " line 94 in server");
});

app.get("/getLists/:user", async (req, res) => {
  const query = await pool.query(
    `SELECT * FROM lists WHERE user_name='${req.params.user}'`
  );

  res.json({
    user: req.params.user,
    lists: query.rows,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
