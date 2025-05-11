import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validacionUpdateUsuario } from '../../routes/schemaUsuariosUpdate.js'
import bcrypt from 'bcrypt'

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
        GROUP_CONCAT(p.nombre_permiso SEPARATOR ', ') AS permisos
      FROM usuarios u
      INNER JOIN roles r ON u.rol_id = r.id
      INNER JOIN roles_permisos rp ON r.id = rp.rol_id
      INNER JOIN permisos p ON rp.permiso_id = p.id
      GROUP BY u.id, u.nombre, u.correo, u.telefono, r.id, r.nombre_rol, r.descripcion_rol`
    )

    if (usuariosExisten.length === 0) return res.status(404).json({ message: 'No se encontraron usuarios en la empresa' })

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

routerUsuarios.get('/usuariosUnico/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [usuario] = await pool.query(
      `SELECT 
        u.id AS usuario_id,
        u.nombre AS nombre_usuario,
        u.correo,
        u.telefono,
        r.nombre_rol,
        r.descripcion_rol,
        GROUP_CONCAT(p.nombre_permiso SEPARATOR ', ') AS nombre_permiso
      FROM usuarios u
      JOIN roles r ON u.rol_id = r.id
      JOIN roles_permisos rp ON r.id = rp.rol_id
      JOIN permisos p ON rp.permiso_id = p.id
      WHERE u.id = ?
      GROUP BY u.id, u.nombre, u.correo, u.telefono, r.nombre_rol, r.descripcion_rol`,
      [id]
    )

    if (usuario.length === 0) {
      return res.status(404).json({ message: 'No se encontró el usuario' })
    }

    const nombrePermisos = usuario[0].nombre_permiso || ''

    let permisos = []
    if (nombrePermisos) {
      permisos = nombrePermisos.split(', ').map((permiso) => ({
        nombre_permiso: permiso
      }))
    }

    const usuarioData = {
      ...usuario[0],
      permisos
    }

    res.status(200).json(usuarioData)
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerUsuarios.delete('/usuariosDelete/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [usuarioExiste] = await pool.query(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    )

    if (usuarioExiste.length === 0) return res.status(404).json({ message: 'Este usuario no existe' })

    await pool.query('DELETE FROM usuarios WHERE id = ?', [id])
    res.status(200).json({
      message: 'Usuario eliminado correctamente'
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Usuario eliminado correctamente',
      error: error.errors || error.message || error
    })
  }
})

routerUsuarios.patch('/updateUsuarios/:id', async (req, res) => {
  const { id } = req.params
  try {
    const vUsuarioUpdate = validacionUpdateUsuario.parse(req.body)

    const [usuarioExiste] = await pool.query(
      'SELECT * FROM usuarios WHERE id = ?',
      [id]
    )
    if (usuarioExiste.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const [rowsPerm] = await pool.query(
      'SELECT id FROM permisos WHERE nombre_permiso = ?',
      [vUsuarioUpdate.nombre_permiso]
    )

    let idPermiso
    if (rowsPerm.length > 0) {
      idPermiso = rowsPerm[0].id
    } else {
      await pool.query(
        'INSERT INTO permisos (nombre_permiso) VALUES (?)',
        [vUsuarioUpdate.nombre_permiso]
      )
      const [newPerm] = await pool.query(
        'SELECT id FROM permisos WHERE nombre_permiso = ?',
        [vUsuarioUpdate.nombre_permiso]
      )
      idPermiso = newPerm[0].id
    }

    const [rowsRol] = await pool.query(
      'SELECT id FROM roles WHERE nombre_rol = ?',
      [vUsuarioUpdate.nombre_rol]
    )

    let idRol
    if (rowsRol.length > 0) {
      idRol = rowsRol[0].id
    } else {
      await pool.query(
        'INSERT INTO roles (nombre_rol, descripcion_rol) VALUES (?, ?)',
        [vUsuarioUpdate.nombre_rol, vUsuarioUpdate.descripcion_rol]
      )
      const [newRol] = await pool.query(
        'SELECT id FROM roles WHERE nombre_rol = ?',
        [vUsuarioUpdate.nombre_rol]
      )
      idRol = newRol[0].id
    }

    await pool.query('DELETE FROM roles_permisos WHERE rol_id = ?', [idRol])

    await pool.query(
      'INSERT IGNORE INTO roles_permisos (permiso_id, rol_id) VALUES (?, ?)',
      [idPermiso, idRol]
    )

    const hashPassword = await bcrypt.hash(vUsuarioUpdate.contrasena, 10)
    await pool.query(
      'UPDATE usuarios SET telefono = ?, contrasena = ?, rol_id = ? WHERE id = ?',
      [vUsuarioUpdate.telefono, hashPassword, idRol, id]
    )

    res.status(200).json({ message: 'Usuario actualizado correctamente' })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.errors || error.message || error
    })
  }
})
