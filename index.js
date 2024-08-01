import express from "express";
import cors from "cors";
const app = express();
const port = 3001;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("build/frontend"));

import rootController from "./controllers/root-controller.js";
import listController from "./controllers/list-controller.js";
import tasksController from "./controllers/tasks-controller.js";
import symptomsController from "./controllers/Symptoms/symptoms-controller.js";

app.use("/", rootController);
app.use("/lists", listController);
app.use("/tasks", tasksController);
app.use("/symptoms", symptomsController);

// should stay at the bottom of the file
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
