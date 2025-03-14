#!/usr/bin/env node

import { createRouter } from '../controllers/controllers.routes.js'
import { Router } from 'express'

export const midelware = Router()

midelware.use('/registro', createRouter)
