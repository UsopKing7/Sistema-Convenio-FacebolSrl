import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export const UpdateUsuario = () => {
  const [telefono, setTelefono] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [nombre_rol, setNombreRol] = useState('')
  const [descripcion_rol, setDescripcionRol] = useState('')
  const [nombre_permiso, setNombrePermiso] = useState('')
  const [descripcion, setDescripcionPermiso] = useState('')
  const navigate = useNavigate()

  const updateUsuario = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3333/updateUsuario', {
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
        nombre_permiso,
        descripcion
      })
    })

    const data = await res.json()

    if (res.ok) {
      navigate(-1)
    } else {
      alert(data.nessage || 'Error al actualizar el usuario')
    }
  }
  return (
    <form onSubmit={updateUsuario}>
      <h2>datos a actualizar</h2>
      <input
        type="text"
        placeholder="telefono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      ></input>
      <input
        type="password"
        placeholder="contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="nombre del rol"
        value={nombre_rol}
        onChange={(e) => setNombreRol(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="descrpcion del rol"
        value={descripcion_rol}
        onChange={(e) => setDescripcionRol(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="nombre del permiso"
        value={nombre_permiso}
        onChange={(e) => setNombrePermiso(e.target.value)}
        required
      ></input>
      <input
        type="text"
        placeholder="descripcion del permiso"
        value={descripcion}
        onChange={(e) => setDescripcionPermiso(e.target.value)}
        required
      ></input>
    </form>
  )
}
