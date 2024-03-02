import { Router } from "express";
import { Pool } from "pg";

const router = Router();

router.post("/add/:user:taskName", async (req, res)=>{
    try {
        const userName = req.params.user;
        const taskName = req.params.taskName;
        const response = await pool.query(
            // attempted this:
            // INSERT INTO tasks (id, name, created_on, description, category) VALUES (7, "mediate", '2024-02-08 12:00:00', 'Description of Task 1', 'Category 1');
            // Got this error back:
            // ERROR:  column "mediate" does not exist
// LINE 2: VALUES (7, "mediate", '2024-02-08 12:00:00', 'Description of...
        );
    }
})