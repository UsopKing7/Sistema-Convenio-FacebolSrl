#!/usr/bin/env node

import { Router } from "express"
import { validationLogin } from "../../routes/validation-login.routes.js"
import { pool, SECRET_JWK_KEY } from "../../models/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const routerLogin = Router()

routerLogin.post("/", async (req, res) => {
  try {
    const loginPage = validationLogin.parse(req.body)
    const token = jwt.sign({ email: loginPage.email }, SECRET_JWK_KEY, {
      expiresIn: "2h",
    })

    const [userExist] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [loginPage.email]
    )

    if (userExist.length > 0) {
      const user = userExist[0]
      const validatePassword = await bcrypt.compare(
        loginPage.password,
        user.password
      )

      if (!validatePassword) {
        return res.status(400).json({ message: "Incorrect password" })
      }

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7200000,
      })
      return res.status(200).json({ message: "Login successful as user", user })
    }

    const [companiesExists] = await pool.query(
      "SELECT * FROM companies WHERE email = ?",
      [loginPage.email]
    )

    if (companiesExists.length > 0) {
      const company = companiesExists[0];
      const validatePassword = await bcrypt.compare(
        loginPage.password,
        company.password
      )

      if (!validatePassword) {
        return res.status(400).json({ message: "Incorrect password" })
      }

      const [users] = await pool.query(
        "SELECT * FROM users WHERE companies_id = ?",
        [company.id]
      )

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7200000,
      });

      if (users.length === 0) {
        return res.status(200).json({ message: "Login successful as company", company })
      }

      return res.status(200).json({ message: "Login successful as company", company, users })
    }

    return res.status(400).json({ message: "Account not found" })
  } catch (error) {
    console.error("Error during login process:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message })
  }
})
