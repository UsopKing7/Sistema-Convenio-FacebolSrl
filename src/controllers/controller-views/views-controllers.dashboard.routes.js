import { Router } from "express"
import { pool } from "../../models/db.js"
import jwt from "jsonwebtoken"

export const routerDashboard = Router()

routerDashboard.get("/", async (req, res) => {
  try {
    const token = req.cookies.access_token
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided")
    }

    const decoded = jwt.verify(token, process.env.SECRET_JWK_KEY)
    const companyId = decoded.company_id

    const [users] = await pool.query(
      "SELECT id, companies_id, name, email, rol FROM users WHERE companies_id = ?",
      [companyId]
    )

    const [[company]] = await pool.query(
      "SELECT name FROM companies WHERE id = ?",
      [companyId]
    )

    res.render("company/dashboard", {
      users,
      companyId,
      companyName: company.name || "Unknown Company"
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).send("Internal server error")
  }
})
