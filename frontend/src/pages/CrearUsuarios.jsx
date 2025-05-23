import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { BASE_URL } from '../config.js'

export const CrearUsuario = () => {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [nombre_rol, setNombreRol] = useState('')
  const [descripcion_rol, setDescripcionRol] = useState('')
  const [nombre_permiso, setNombrePermiso] = useState('')
  const navigate = useNavigate()

  const crearUsuario = async (e) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        nombre,
        correo,
        telefono,
        contrasena,
        nombre_rol,
        descripcion_rol,
        nombre_permiso: [nombre_permiso]
      })
    })

    const data = await res.json()

    if (res.ok) {
      navigate(-1)
    } else {
      alert(data.message || 'Error al crear el Usuario')
    }
  }

  const volver = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <form onSubmit={crearUsuario}>
      <h2>Datos del nuevo Usuario</h2>
      <div className="input-group">
        <label htmlFor="Nombre">Nombre</label>
        <input
          type="text"
          placeholder="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Correo">Correo</label>
        <input
          type="text"
          placeholder="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Telefono">Teléfono</label>
        <input
          type="text"
          placeholder="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="Contrasena">Contraseña</label>
        <input
          type="password"
          placeholder="contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="NombreRol">Nombre del rol</label>
        <input
          type="text"
          placeholder="nombre del rol"
          value={nombre_rol}
          onChange={(e) => setNombreRol(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="DescripcionRol">Descripción del rol</label>
        <input
          type="text"
          placeholder="descrpcion del rol"
          value={descripcion_rol}
          onChange={(e) => setDescripcionRol(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="NombrePermiso">Nombre del permiso</label>
        <input
          type="text"
          placeholder="nombre del permiso"
          value={nombre_permiso}
          onChange={(e) => setNombrePermiso(e.target.value)}
          required
        />
      </div>
      <button type="submit">Registrar Usuario</button>
      <button onClick={volver}>Volver</button>
    </form>
  )
}
