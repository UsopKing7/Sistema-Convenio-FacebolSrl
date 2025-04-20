#!/usr/bin/env node

import jwt from 'jsonwebtoken'
import { SECRET_JWK_KEY } from '../models/db.js'

export const rutaprotegida = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Acceso no authorisado' })
  }
  try {
    const decoded = jwt.verify(token, SECRET_JWK_KEY)
    req.usuario = decoded
    next()
  } catch (error) {
    return res.status(500).json({
      message: 'Token invalido o expirado'
    })
  }
}
