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
  try {
    const query = await pool.query(
      `SELECT * FROM lists WHERE user_name='${req.params.user}'`
    );

    res.json({
      user: req.params.user,
      lists: query.rows,
    });
  } catch (error) {
    console.log({ error }, "app.get, line 110");
  }
});

app.post("/addList/:user/:listName", async (req, res) => {
  try {
    const userName = req.params.user;
    const listName = req.params.listName;
    // INSERT INTO lists(name, user_name, created_on, last_updated) VALUES('testing3', 'audrey', NOW(), NOW());
    const response = await pool.query(
      `INSERT INTO lists(name, user_name, created_on, last_updated) VALUES('${listName}', '${userName}', NOW(), NOW()) RETURNING *;`
    );
    //  RETURNING * is not the longterm plan; we should return to the FE if it succeeded or not (error checking etc)
    res.json(response);
  } catch (error) {
    res.status(500).json({ serverMessage: error.message });
  }
});

app.post("/pauseList/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(
      `UPDATE lists
      SET active = CASE
        WHEN active = TRUE THEN FALSE
        ELSE TRUE
        END
    WHERE id=${id};`
    );
    console.log(response);
    // is not updating the DB, don't know why
    // also wtaf is this response???
    res.json(response);
  } catch (error) {
    res.status(500).json(error.mess);
    console.log(error);
  }
});

app.post("/deleteList/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(`DELETE FROM lists WHERE id = ${id};`);
    res.json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/editList/:id/:name", async (req, res) => {
  try {
    const id = req.params.id;
    const newName = req.params.name;
    console.log(newName);
    const response = await pool.query(
      `UPDATE lists SET name = '${newName}' WHERE id = ${id};`
    );
    res.json(response);
  } catch (error) {
    console.log("inside catch block", error);
    res.status(500).json(error.message);
  }
});

// should stay at the bottom of the file
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
