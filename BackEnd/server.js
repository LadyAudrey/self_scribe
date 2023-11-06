//  to run backend- "node server.js" in terminal, to port 3001

const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hellooooooo World!");
});

// need to figure out why the first index is n't showing up on the FE console log via DisplayLists

app.get("/completed", (req, res) => {
  console.log("completed is being hit");
  res.send(["Kudos", "Task1", "Task2", "Task3"]);
});

app.get("/TDL", (req, res) => {
  console.log("completed is being hit");
  res.send(["TDL", "Task1", "Task2", "Task3"]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});