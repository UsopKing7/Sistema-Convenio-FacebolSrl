import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Building,
  Handshake,
  CreditCard,
  LogOut,
  User2Icon,
  Plus
} from 'lucide-react'
import '../styles/Dashboard.css'
import { getInitials } from './Dashboard'
import { useState, useEffect } from 'react'

export const Tarjetas = () => {
  const { id } = useParams()
  const location = useLocation()
  const { nombre_empresa, correo } = location.state || {}
  const navigate = useNavigate()

  const [tarjetas, setTarjetas] = useState([])

  useEffect(() => {
    const fetchTarjetas = async () => {
      try {
        const res = await fetch('http://localhost:3333/tarjetas', {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (res.ok) {
          setTarjetas(json.data)
        } else {
          setTarjetas([])
        }
      } catch {
        setTarjetas([])
      }
    }
    fetchTarjetas('tarjetas')
  }, [])

  const handleLogout = async () => {
    const res = await fetch('http://localhost:3333/logout', {
      method: 'GET',
      credentials: 'include'
    })

    if (res.ok) {
      navigate('/')
    } else {
      throw new Error('Error al cierre de session')
    }
  }
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <div
            className="avatar-circle"
            style={{ backgroundColor: nombre_empresa }}
          >
            {getInitials(nombre_empresa)}
          </div>
          <h2>{nombre_empresa || 'Usuario'}</h2>
          <p>{correo || 'correo@ejemplo.com'}</p>
        </div>
        <nav className="nav">
          <Link
            to={`/dashboard/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link"
          >
            <Home className="icon" /> Inicio
          </Link>
          <Link
            to={`/dashboard/usuario/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link"
          >
            <User2Icon className="icon" /> Usuarios
          </Link>
          <Link
            to={`/dashboard/sucursales/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link"
          >
            <Building className="icon" /> Sucursales
          </Link>
          <Link
            to={`/dashboard/convenios/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link"
          >
            <Handshake className="icon" /> Convenios
          </Link>
          <Link
            to={`/dashboard/tarjetas/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link active"
          >
            <CreditCard className="icon" /> Tarjetas
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut className="icon" /> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Bienvenido a Tarjetas, {nombre_empresa}</h1>
        </header>

        <div className="module-content">
          {tarjetas.length === 0 ? (
            <p>No hay tarjetas registradas</p>
          ) : (
            <ul className="sucursales-list">
              {tarjetas.map((tarjetas, index) => {
                ;<li key={index} className="sucursal-card">
                  <h3>{tarjetas.codigo}</h3>
                  <p>
                    estado: <strong>{tarjetas.estado}</strong>
                  </p>
                </li>
              })}
            </ul>
          )}
        </div>
      </main>
      <Link
        to={`/dashboard/usuario/${id}/crear`}
        className="floating-add-btn"
        title="Agregar usuario"
      >
        <Plus />
      </Link>
    </div>
  )
}
