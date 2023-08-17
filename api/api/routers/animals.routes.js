import { Router } from "express";
import { pool } from "../db.js";

const router = Router()

router.get("/ping", async (req,res) => {
   const result = await pool.query("SELECT 1 + 1 as result")
   console.log(result);
   res.json("creando la base de datos")
})

export default router;