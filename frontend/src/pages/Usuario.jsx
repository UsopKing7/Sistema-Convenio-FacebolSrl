import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { Home, Building, Handshake, CreditCard, LogOut, User2Icon } from 'lucide-react'
import { getInitials } from './Dashboard'
import { useEffect, useState } from 'react'
import '../styles/Dashboard.css'

export const Usuario = () => {
  const { id } = useParams()
  const location = useLocation()
  const { nombre_empresa, correo } = location.state || {}
  const navigate = useNavigate()

  const [usuario, setUsuarios] = useState([])

  useEffect(() => {
    const fetchUsusarios = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (res.ok && Array.isArray(json.data)) {
          setUsuarios(json.data)
        } else {
          setUsuarios([])
        }
      } catch {
        setUsuarios([])
      }
    }
    fetchUsusarios('usuarios')
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
            className="nav-link active"
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
            className="nav-link"
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
          <h1>Bienvenido a los Usuarios, {nombre_empresa}</h1>
        </header>

        <div className="module-content">
          {usuario.length === 0 ? (
            <p>No hay usuarios en esta empresa</p>
          ) : (
            <ul className="sucursales-list">
              {usuario.map((usuario, index) => (
                <li key={index} className="sucursal-card">
                  <h3>{usuario.nombre}</h3>
                  <p><strong>Correo: </strong> {usuario.correo} </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
