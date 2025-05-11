import { Router } from 'express'
import { pool } from '../../models/db.js'
import { validacionUpdateUsuario } from '../../routes/schemaUsuariosUpdate.js'

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

routerUsuarios.get('/usuarios/:id', async (req, res) => {
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
        GROUP_CONCAT(p.nombre_permiso SEPARATOR ', ') AS nombre_permiso,
        GROUP_CONCAT(p.descripcion SEPARATOR ', ') AS descripcion
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

    // Modificamos la respuesta para devolver los permisos como un array
    const permisos = usuario[0].nombre_permiso.split(', ').map((permiso, i) => ({
      nombre_permiso: permiso,
      descripcion: usuario[0].descripcion.split(', ')[i]
    }));

    const usuarioData = {
      ...usuario[0],
      permisos: permisos
    }

    res.status(200).json(usuarioData)
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
      error: error.errors || error.message || error
    })
  }
})

routerUsuarios.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params
  try {
    const [usuarioExiste] = await pool.query(
      'SELECT * FROM usuarios WHERE id = ?', [id]
    )

    if (usuarioExiste.length === 0) return res.status(404).json({ message: 'Este usuario no existe' })

    await pool.query(
      'DELETE FROM usuarios WHERE id = ?', [id]
    )
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
      'SELECT * FROM usuarios WHERE id = ?', [id]
    )

    if (usuarioExiste.length === 0) return res.status(404).json({ message: 'error no se encontro el usuarios' })

    const [usuarioActualizado] = await pool.query(
      'UPDATE usuarios SET telefono = ?, contrasena = ?, nombre_rol = ?, descripcion_rol = ?, nombre_permiso = ?, descripcion = ? WHERE id = ?', [
        vUsuarioUpdate.telefono,
        vUsuarioUpdate.contrasena,
        vUsuarioUpdate.nombre_rol,
        vUsuarioUpdate.descripcion_rol,
        vUsuarioUpdate.nombre_permiso,
        vUsuarioUpdate.descripcion,
        id
      ]
    )

    res.status(200).json({ message: usuarioActualizado })
  } catch (error) {
    return res.status(500).json({
      message: 'Error internal del servidor',
      error: error.errors || error.message || error
    })
  }
})
