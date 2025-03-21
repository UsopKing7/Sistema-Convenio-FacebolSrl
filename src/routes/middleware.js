#!/usr/bin/env node

import { createRouter } from '../controllers/companies-controllers/post-controllers.routes.js'
import { getCompanies } from '../controllers/companies-controllers/get-companies-controllers.routes.js'
import { deleteCompanies } from '../controllers/companies-controllers/delete-companies-controllers.routes.js'
import { PatchRouterCompanies } from '../controllers/companies-controllers/patch-companies-controllers.routes.js'

import { getUsers } from '../controllers/users-controllers/get-users-controllers.routes.js'
import { usersRouter } from '../controllers/users-controllers/post-users-controllers.routes.js'
import { PatchRouterUsers } from '../controllers/users-controllers/patch-users-controllers.routes.js'
import { deleteUsers } from '../controllers/users-controllers/delete-users-controllers.routes.js'

import { routerLogin } from '../controllers/login-controllers/login-companies-controllers.routes.js'

import { Router } from 'express'

export const middleware = Router()
// register the companies && users
middleware.use('/register', createRouter)
middleware.use('/users/signup', usersRouter)
// recover && delete companies && users
middleware.use('/users', getUsers)
middleware.use('/users/delete', deleteUsers)
middleware.use('/companies', getCompanies)
middleware.use('/companies/delete', deleteCompanies)

middleware.use('/companies/update', PatchRouterCompanies)
middleware.use('/users/update', PatchRouterUsers)

middleware.use('/login', routerLogin)
