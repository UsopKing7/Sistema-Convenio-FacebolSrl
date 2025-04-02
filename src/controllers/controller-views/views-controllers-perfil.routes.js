import { Router } from "express";
import { pool } from "../../models/db.js";
import jwt from "jsonwebtoken";

export const routerPerfil = Router();

routerPerfil.get("/", async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    const decoded = jwt.verify(token, process.env.SECRET_JWK_KEY);
    const userEmail = decoded.email;
    const [userResult] = await pool.query("SELECT * FROM users WHERE email = ?", [userEmail]);

    if (userResult.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = userResult[0];

    const { password, ...userWithoutPassword } = user;

    res.render("user/profile", { user: userWithoutPassword });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Internal server error");
  }
})
