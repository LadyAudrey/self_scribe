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

app.get("/listItems", (req, res) => {
  res.json(toDoList);
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

// tutorial we are following to add PostGreSQL
//  https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-node-js-on-ubuntu-20-04#prerequisites

//  redo step 2, using evergreene instead of audrey
