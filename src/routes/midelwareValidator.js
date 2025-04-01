import jwt from 'jsonwebtoken';
import { SECRET_JWK_KEY } from '../models/db.js';

export const autheticationToken = (req, res, next) => {
  const token = req.cookies.access_token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWK_KEY);

    req.user = {
      email: decoded.email,
      company_id: decoded.company_id 
    };

    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};
