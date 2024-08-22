import { Router } from "express";
import { pool } from "../models/db.js";

const router = Router();

router.get("/read/:user", async(req, res)=>{
    const sql = "SELECT * FROM task_history";
    const params = [];
    
    try {
        const response = await getTaskHistory();
    } catch (error) {
        console.error(error)
    }
})

export async function getTaskHistory (params){
    return true;
}