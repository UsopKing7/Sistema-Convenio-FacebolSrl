#!/usr/bin/env node

import { createPool } from 'mysql2/promise'
import pc from 'picocolors'
import dotenv from 'dotenv'

dotenv.config()

export const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

const testConnection = async () => {
  try {
    const connection = await pool.getConnection()
    console.log(
      pc.blue('[+] Connection to data bases complete')
    )
    connection.release()
  } catch (error) {
    console.log(
      pc.red('[*] Error to connection to database')
    )
  }
}

testConnection()
export const SECRET_JWK_KEY = process.env.SECRET_JWK_KEY
