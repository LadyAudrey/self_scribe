//  to run backend- node server.js

const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hellllllo World!");
});

app.get("/completed", (req, res) => {
  res.send(["Task1", "Task2", "Task3"]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
