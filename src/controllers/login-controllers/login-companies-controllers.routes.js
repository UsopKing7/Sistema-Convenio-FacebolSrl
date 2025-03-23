#!/usr/bin/env node

import { Router } from "express";
import { validationLogin } from "../../routes/validation-login.routes.js";
import { pool, SECRET_JWK_KEY } from "../../models/db.js";
import bcrypt from "bcrypt";
import jwk from "jsonwebtoken";

export const routerLogin = Router();

routerLogin.post("/", async (req, res) => {
  try {
    const loginPage = validationLogin.parse(req.body);
    const token = jwk.sign({ email: loginPage.email }, SECRET_JWK_KEY, {
      expiresIn: "1h",
    });
    const [userExist] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [loginPage.email]
    );

    if (userExist.length > 0) {
      const user = userExist[0];
      const validatePassword = await bcrypt.compare(
        loginPage.password,
        user.password
      );

      if (!validatePassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      res.cookie("acces_token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60
      });
      return res.status(200).json({ message: "Login successful as user", token });
    }

    const [companiesExists] = await pool.query(
      "SELECT * FROM companies WHERE email = ?",
      [loginPage.email]
    );

    if (companiesExists.length > 0) {
      const company = companiesExists[0];
      const token = jwk.sign({ email: loginPage.email }, SECRET_JWK_KEY, {
        expiresIn: "1h",
      });
      const validatePassword = await bcrypt.compare(
        loginPage.password,
        company.password
      );

      if (!validatePassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      res.cookie("acces_token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60
      });
      return res.status(200).json({ message: "Login successful as user", token });
    }

    return res.status(400).json({ message: "Account not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});
