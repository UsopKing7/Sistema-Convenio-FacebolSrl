#!/usr/bin/env node

import { createPool } from 'mysql2/promise'

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
      `[+] Connection to data bases complete`
    )
    connection.release()
  } catch (error) {
    console.log(
      `[*] Error to connection to database`
    )
  }
}

testConnection()