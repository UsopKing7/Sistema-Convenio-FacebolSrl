import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/Login.css'
import { useEffect } from 'react'
import { BASE_URL } from '../config.js'

export const UpdateUsuario = () => {
  const { id } = useParams()
  const [telefono, setTelefono] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [nombre_rol, setNombreRol] = useState('')
  const [descripcion_rol, setDescripcionRol] = useState('')
  const [nombre_permiso, setNombrePermiso] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsuario = async () => {
      const res = await fetch(`${BASE_URL}/usuariosUnico/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok) {
        setTelefono(data.telefono || '')
        setContrasena('')
        setNombreRol(data.nombre_rol || '')
        setDescripcionRol(data.descripcion_rol || '')
        setNombrePermiso(data.nombre_permiso || '')
      } else {
        alert(data.message || 'No se pudo obtener los datos del usuario')
      }
    }

    fetchUsuario()
  }, [id])

  const updateUsuario = async (e) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/updateUsuarios/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        telefono,
        contrasena,
        nombre_rol,
        descripcion_rol,
        nombre_permiso
      })
    })

    const data = await res.json()

    if (res.ok) {
      navigate(-1)
    } else {
      alert(data.nessage || 'Error al actualizar el usuario')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={updateUsuario}>
      <h2>datos a actualizar</h2>
      <div className="input-group">
        <label htmlFor="Telefono">Telfono</label>
        <input
          type="text"
          placeholder="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Contraseña">Contraseña</label>
        <input
          type="password"
          placeholder="contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="Nombre Rol">Nombre Rol</label>
        <input
          type="text"
          placeholder="nombre del rol"
          value={nombre_rol}
          onChange={(e) => setNombreRol(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Descripcion Rol">Descripcion Rol</label>
        <input
          type="text"
          placeholder="descrpcion del rol"
          value={descripcion_rol}
          onChange={(e) => setDescripcionRol(e.target.value)}
          required
        />
      </div>
      <div className='input-group'>
        <label htmlFor="Nombre Permiso">Nombre del Permiso</label>
        <input
          type="text"
          placeholder="nombre del permiso"
          value={nombre_permiso}
          onChange={(e) => setNombrePermiso(e.target.value)}
          required
        />
      </div>
      <button type="submit">Actualizar</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
