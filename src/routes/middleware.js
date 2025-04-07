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
import { routerDashboard } from '../controllers/controller-views/views-controllers.dashboard.routes.js'
import { routerPerfil } from '../controllers/controller-views/views-controllers-perfil.routes.js'
import { logoutRouter } from '../controllers/login-controllers/logout.routes.js'
import { routerRegisterUsers } from '../controllers/controller-views/viewa-register.routes.js'
import { routerUpdateUsers } from '../controllers/controller-views/views-update.routes.js'
import { routerMovementsGet } from '../controllers/movements-controllers/get-contollers-movements.routes.js'
import { routerMovementsPost } from '../controllers/movements-controllers/post-controlles-movements.routes.js'
import { routerMovementsPatch } from '../controllers/movements-controllers/patch-controlles-movements-patch.routes.js'
import { routerMovementsDelete } from '../controllers/movements-controllers/delete-controllers-movements.routes.js'
import { routerDeleteUsers } from '../controllers/controller-views/deleteViews.routes.js'
import { getInsertMovements } from '../controllers/controller-views/views-insertMovenments.routes.js'

import { Router } from "express";

export const middleware = Router();
middleware.use('/', logoutRouter);

// Rutas públicas
middleware.use("/register", createRouter)
middleware.use("/login", routerLogin)
middleware.use("/", routerViewsLogin)
middleware.use("/registerEmpresa", routerViewsRegisterEmpresa)
middleware.use("/movements", routerMovementsGet)
middleware.use('/movements/registerMovements', routerMovementsPost)
middleware.use("/movements/registerMovements", getInsertMovements)
middleware.use("/movements", routerMovementsPatch)
middleware.use("/movements", routerMovementsDelete)

// Rutas protegidas
middleware.use("/register/registrarUsers", autheticationToken, usersRouter)
middleware.use("/users/delete", autheticationToken, deleteUsers)
middleware.use("/users/update", autheticationToken, PatchRouterUsers)

middleware.use("/companies/delete", autheticationToken, deleteCompanies)
middleware.use("/companies/update", autheticationToken, PatchRouterCompanies)
middleware.use("/company/dashboard", autheticationToken, routerDashboard)
middleware.use("/user/profile", autheticationToken, routerPerfil)
middleware.use("/registerUsers", autheticationToken, routerRegisterUsers)
middleware.use("/edit-user", autheticationToken, routerUpdateUsers)
middleware.use("/delete-user", autheticationToken, routerDeleteUsers)

middleware.use((req, res) => {
  console.log(req.url)
  return res.render('404page/404')
})
