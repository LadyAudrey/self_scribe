import { Router } from "express";

import { db } from "../db/db.js";

const router = Router();

router.post("/add/:user/:listName", async (req, res) => {
  try {
    const userName = req.params.user;
    const listName = req.params.listName;
    const description = req.body.description || "";
    const response = await createList(userName, listName, description);
    res.json(response);
  } catch (error) {
    res.status(500).json({ serverMessage: error.message });
  }
});

export async function createList(userName, listName, description) {
  return db.run(
    "INSERT INTO lists(name, user_name, description) VALUES($1, $2, $3) RETURNING *;",
    [listName, userName, description]
  );
}

router.get("/read/:user", async (req, res) => {
  try {
    const response = await getLists(req.params.user);
    console.log(response);
    res.json(response.rows);
  } catch (error) {
    console.log({ error }, "app.get, line 110");
  }
});

export async function getLists(user) {
  return db.run("SELECT * FROM lists WHERE user_name=?", user);
}

router.post("/edit/:id/:name", async (req, res) => {
  try {
    const id = req.params.id;
    const newName = req.params.name;
    const response = await editList(newName, id);
  } catch (error) {
    console.log("inside catch block", error);
    res.status(500).json(error.message);
  }
});

export async function editList(newName, id) {
  return db.run(`UPDATE lists SET name = '${newName}' WHERE id = ${id};`);
}

router.post("/pause/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = db.run(
      `UPDATE lists
        SET active = CASE
          WHEN active = TRUE THEN FALSE
          ELSE TRUE
          END
      WHERE id=${id};`
    );
    res.json(response);
  } catch (error) {
    res.status(500).json(error.mess);
    console.log(error);
  }
});

// TODO: currently not working
// foreign keys relying on it, need CASCADE (Fx) instead of NO ACTION?

router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = deleteList(id);
    res.json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export async function deleteList(id) {
  return db.run(`DELETE FROM lists WHERE id = ${id};`);
}

export default router;
