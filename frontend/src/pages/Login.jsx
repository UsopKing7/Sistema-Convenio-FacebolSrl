import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'
import { BASE_URL } from '../config.js'

export const Login = () => {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ correo, contrasena })
    })

    if (res.ok) {
      const id = await fetch(`${BASE_URL}/id`, {
        credentials: 'include'
      })
      const data = await id.json()

      if (data.id) {
        navigate(`/dashboard`, {
          state: {
            nombre: data.nombre,
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
      <h2>Ingrese sus credenciales</h2>
      <div className="input-group">
        <label htmlFor="email">Correo corporativo</label>
        <input
          id="email"
          type="email"
          placeholder="tu@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  )
}
