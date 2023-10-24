//  to run backend- "node server.js" in terminal, to port 3001

const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hellooooooo World!");
});

app.get("/completed", (req, res) => {
  console.log("completed is being hit");
  res.send(["Task1", "Task2", "Task3"]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
