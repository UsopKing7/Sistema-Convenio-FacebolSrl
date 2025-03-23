#!/usr/bin/env node

import { createPool } from 'mysql2/promise'
import pc from 'picocolors'

export const pool = createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "nadusopking",
  database: "agreement_system"
})

const testConnection = async () => {
  try {
    const connection = await pool.getConnection()
    console.log(
      pc.blue(`[+] Connection to data bases complete`)
    )
    connection.release()
  } catch (error) {
    console.log(
      pc.red(`[*] Error to connection to database`)
    )
  }
}

testConnection()
export const SECRET_JWK_KEY = 'this-is-ah-awesome-secret-key'
