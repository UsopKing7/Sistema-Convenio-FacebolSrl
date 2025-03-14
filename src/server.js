#!/usr/bin/env node

import express from 'express'
import { midelware } from './routes/midelware.js';

const app = express()
app.use(express.json())
app.disable('x-powered-by')

app.use(midelware)

const PORT = process.env.PORT ?? 3333
app.listen(PORT, () => {
  console.table({
    URL:  'http://localhost:' + PORT
  })
})
