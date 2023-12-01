// installed body-parser

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
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
      name: "exercise",
      completed: true,
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
