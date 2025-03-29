import { Router } from "express";
import { pool } from "../../models/db.js";

export const routerDashboard = Router();

routerDashboard.get("/", async (req, res) => {
  try {
    const [users] = await pool.query("SELECT name, email FROM users");
    res.render("company/dashboard", { users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
});