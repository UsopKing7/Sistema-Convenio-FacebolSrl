#!/usr/bin/env node

import { Router } from "express";
import { validationLogin } from "../../routes/validation-login.routes.js";
import { pool } from "../../models/db.js";
import bcrypt from "bcrypt";

export const routerLogin = Router();

routerLogin.post("/", async (req, res) => {
  try {
    const loginPage = validationLogin.parse(req.body);

    const [userExist] = await pool.query("SELECT * FROM users WHERE email = ?", [loginPage.email]);

    if (userExist.length > 0) {
      const user = userExist[0];
      const validatePassword = await bcrypt.compare(loginPage.password, user.password);

      if (!validatePassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      return res.status(200).json({ message: "Login successful as user" });
    }

    const [companiesExists] = await pool.query("SELECT * FROM companies WHERE email = ?", [loginPage.email]);

    if (companiesExists.length > 0) {
      const company = companiesExists[0];
      const validatePassword = await bcrypt.compare(loginPage.password, company.password);

      if (!validatePassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      return res.status(200).json({ message: "Login successful as company" });
    }

    return res.status(400).json({ message: "Account not found" });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
