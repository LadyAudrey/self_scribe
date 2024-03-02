import { Router } from "express";
import { Pool } from "pg";

const router = Router();

router.post("/add/:user:taskName", async (req, res)=>{
    try {
        const userName = req.params.user;
        const taskName = req.params.taskName;
        const response = await pool.query(
            `INSERT INTO lists(name, user_name, created_on, last_updated, active) VALUES('${taskName}', '${userName}', NOW(), NOW()) RETURNING *;`
        );
    }
})