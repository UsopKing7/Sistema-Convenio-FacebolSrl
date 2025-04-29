import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

export const Login = () => {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ correo, contrasena })
    })

    if (res.ok) {
      const id = await fetch('http://localhost:3333/id', {
        credentials: 'include'
      })
      const data = await id.json()

      if (data.id) {
        navigate(`/dashboard/${data.id}`, {
          state: {
            nombre_empresa: data.nombre_empresa,
            correo: data.correo
          }
        })
      } else {
        alert('Error al obtener el ID')
      }
    } else {
      alert('Error al iniciar sesión')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ingrese sus credenciasles</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />{' '}
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />
      <br />
      <button type="submit">Entrar</button>
    </form>
  )
}
