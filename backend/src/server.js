#!/usr/bin/env node

import express from 'express'
import { middleware } from './routes/middleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.disable('x-powered-by')

app.use(middleware)

const PORT = process.env.PORT || 3333
app.listen(PORT, '0.0.0.0', () => {
  console.table({
    URL: `http://0.0.0.0:${PORT}`
  })
})
