#!/usr/bin/env node

import { createRouter } from "../controllers/companies-controllers/post-controllers.routes.js";
import { getCompanies } from "../controllers/companies-controllers/get-companies-controllers.routes.js";
import { deleteCompanies } from "../controllers/companies-controllers/delete-companies-controllers.routes.js";
import { PatchRouterCompanies } from "../controllers/companies-controllers/patch-companies-controllers.routes.js";

import { getUsers } from "../controllers/users-controllers/get-users-controllers.routes.js";
import { usersRouter } from "../controllers/users-controllers/post-users-controllers.routes.js";
import { PatchRouterUsers } from "../controllers/users-controllers/patch-users-controllers.routes.js";
import { deleteUsers } from "../controllers/users-controllers/delete-users-controllers.routes.js";

import { routerLogin } from "../controllers/login-controllers/login-companies-controllers.routes.js";

import { autheticationToken } from "./midelwareValidator.js"

import { routerViewsLogin } from '../controllers/controller-views/views-controller-login.routes.js'
import { routerViewsRegisterEmpresa } from '../controllers/controller-views/views-controllers-registerEmpresa.routes.js'

import { Router } from "express";

export const middleware = Router();

// Rutas públicas
middleware.use("/register", createRouter)
middleware.use("/register/registrarUsers", usersRouter)
middleware.use("/login", routerLogin)
middleware.use("/", routerViewsLogin)
middleware.use("/registerEmpresa", routerViewsRegisterEmpresa)

// Rutas protegidas
middleware.use("/users", autheticationToken, getUsers)
middleware.use("/users/delete", autheticationToken, deleteUsers)
middleware.use("/users/update", autheticationToken, PatchRouterUsers)

middleware.use("/companies", autheticationToken, getCompanies)
middleware.use("/companies/delete", autheticationToken, deleteCompanies)
middleware.use("/companies/update", autheticationToken, PatchRouterCompanies)

middleware.use((req, res) => {
  console.log(req.url)
  return res.render('404page/404')
})