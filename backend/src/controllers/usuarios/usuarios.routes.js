import { Router } from 'express'
import { pool } from '../../models/db.js'

export const routerUsuarios = Router()

routerUsuarios.get('/usuarios', async (req, res) => {
  try {
    const [usuariosExisten] = await pool.query(
      `SELECT 
        u.id AS usuario_id, 
        u.nombre AS nombre_usuario, 
        u.correo, 
        u.telefono, 
        r.id AS rol_id, 
        r.nombre_rol, 
        r.descripcion_rol, 
        p.id AS permiso_id, 
        p.nombre AS nombre_permiso
      FROM usuarios u
      INNER JOIN roles r ON u.rol_id = r.id
      INNER JOIN roles_permisos rp ON r.id = rp.rol_id
      INNER JOIN permisos p ON rp.permiso_id = p.id`
    )

    if (usuariosExisten.length === 0) return res.status(404).json({ message: 'No se encontraron usuarios en la epresa' })

    res.status(200).json({
      data: usuariosExisten
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})
