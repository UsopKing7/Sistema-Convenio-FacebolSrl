#!/usr/bin/env node

import { createRouter } from '../controllers/controllers.routes.js'
import { usersRouter } from '../controllers/users-controllers.routes.js'
import { Router } from 'express'

export const middleware = Router()

middleware.use('/register', createRouter)
middleware.use('/users/signup', usersRouter)