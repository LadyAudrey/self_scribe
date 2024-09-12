import { Router } from "express";

import { insert, remove, select, update } from "../db/db.js";

const router = Router();

router.post("/add/:user/:listName", async (req, res) => {
  try {
    const userName = req.params.user;
    const listName = req.params.listName;
    const description = req.body.description || "";
    const response = await createList(userName, listName, description);
    res.json({
      id: response,
    });
  } catch (error) {
    res.status(500).json({ serverMessage: error.message });
  }
});

export async function createList(userName, listName, description) {
  return insert(
    "INSERT INTO lists(name, user_name, description) VALUES(?, ?, ?);",
    [listName, userName, description]
  );
}

router.get("/read/:user", async (req, res) => {
  // check if user is valid #
  try {
    const response = await getLists(req.params.user);
    res.json(response);
  } catch (error) {
    // need to return a 500 response
    console.error({ error }, "app.get, line 110");
  }
});

export async function getLists(user) {
  return select("SELECT * FROM lists WHERE user_name=?", user);
}

// TODO update to "router.update"
router.post("/edit/:id/:name", async (req, res) => {
  try {
    const id = req.params.id;
    const newName = req.params.name;
    await editList(newName, id);
    res.end();
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export async function editList(newName, id) {
  return update("UPDATE lists SET name = ? WHERE id = ?;", [newName, id]);
}

router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = deleteList(id);
    res.json({
      changes: response,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export async function deleteList(id) {
  return remove(`DELETE FROM lists WHERE id = ?;`, [id]);
}

export default router;
