#!/usr/bin/env node

import express from 'express'
import { middleware } from './routes/middleware.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.disable('x-powered-by')
app.set('view engine', 'ejs')
app.set('views', './src/views')
app.use(express.static('./src/views'))
app.use(express.urlencoded({ extended: true }))

app.use(middleware)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.table({
    URL: 'http://localhost:' + PORT
  })
})
