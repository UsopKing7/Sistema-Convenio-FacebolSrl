#!/usr/bin/env node

import { Router } from "express"
import { validationLogin } from "../../routes/validation-login.routes.js"
import { pool, SECRET_JWK_KEY } from "../../models/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const routerLogin = Router()

routerLogin.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const loginPage = validationLogin.parse(req.body);
    console.log("Validation successful:", loginPage);

    const token = jwt.sign({ email: loginPage.email }, SECRET_JWK_KEY, {
      expiresIn: "1m",
    });
    console.log("Token generated:", token);

    const [userExist] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [loginPage.email]
    );
    console.log("User query result:", userExist);

    if (userExist.length > 0) {
      const user = userExist[0];
      const validatePassword = await bcrypt.compare(
        loginPage.password,
        user.password
      );
      console.log("Password validation result:", validatePassword);

      if (!validatePassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60000,
      });
      return res.status(200).json({ message: "Login successful as user", user });
    }

    const [companiesExists] = await pool.query(
      "SELECT * FROM companies WHERE email = ?",
      [loginPage.email]
    );
    console.log("Company query result:", companiesExists);

    if (companiesExists.length > 0) {
      const company = companiesExists[0];
      const validatePassword = await bcrypt.compare(
        loginPage.password,
        company.password
      );
      console.log("Password validation result for company:", validatePassword);

      if (!validatePassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const [users] = await pool.query(
        "SELECT * FROM users WHERE companies_id = ?",
        [company.id]
      );
      console.log("Users associated with company:", users);

      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60000,
      });

      if (users.length === 0) {
        return res.status(200).json({ message: "Login successful as company", company });
      }

      return res.status(200).json({ message: "Login successful as company", company, users });
    }

    return res.status(400).json({ message: "Account not found" });
  } catch (error) {
    console.error("Error during login process:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});