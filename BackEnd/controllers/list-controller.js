import { Router } from "express";
import { pool } from "../models/db.js";

const router = Router();

router.get("/read/:user", async (req, res) => {
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

router.post("/add/:user/:listName", async (req, res) => {
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

router.post("/edit/:id/:name", async (req, res) => {
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

router.post("/pause/:id", async (req, res) => {
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
    res.json(response);
  } catch (error) {
    res.status(500).json(error.mess);
    console.log(error);
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await pool.query(`DELETE FROM lists WHERE id = ${id};`);
    res.json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
