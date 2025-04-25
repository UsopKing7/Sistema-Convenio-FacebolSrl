import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Building,
  Handshake,
  CreditCard,
  LogOut,
  User2Icon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import '../styles/Dashboard.css'

// eslint-disable-next-line react-refresh/only-export-components
export const getInitials = (name) => {
  if (!name) return 'US'
  const parts = name.split(' ')
  let initials = ''
  for (let i = 0; i < Math.min(parts.length, 2); i++) {
    initials += parts[i].charAt(0).toUpperCase()
  }
  return initials
}

export const Dashboard = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { nombre_empresa, correo } = location.state || {}

  const [conveniosData, setConveniosData] = useState([])
  const [sucursalesData, setSucursalesData] = useState([])

  useEffect(() => {
    const fetchDashboardData = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}`, {
          method: 'GET',
          credentials: 'include'
        })
        const json = await res.json()

        if (Array.isArray(json.data)) {
          setConveniosData(json.data)
        } else {
          setConveniosData([])
        }
      } catch {
        setConveniosData([])
      }
    }
    fetchDashboardData('inicioConvenios')
  }, [])

  useEffect(() => {
    const fetchSucursalData = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (Array.isArray(json.data)) {
          setSucursalesData(json.data)
        } else {
          setSucursalesData([])
        }
      } catch {
        setSucursalesData([])
      }
    }
    fetchSucursalData('inicioSucursales')
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:3333/logout', {
        method: 'GET',
        credentials: 'include'
      })

      if (res.ok) {
        navigate('/')
      } else {
        throw new Error('Error al cerrar sesión')
      }
    } catch (error) {
      console.error(error)
      alert('Error al cerrar sesión')
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
            className="nav-link active"
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
          <h1>Bienvenido, {nombre_empresa || 'Usuario'}</h1>
        </header>

        <div className="module-content">
          {Object.keys(conveniosData).length === 0 ? (
            <p>No hay nada que mostrar</p>
          ) : (
            <ul className="card-list">
              <li className="stat-card">
                <h3>Convenios</h3>
                <p>Total: {conveniosData[0]?.total_convenios}</p>
              </li>
            </ul>
          )}

          {Object.keys(sucursalesData).length === 0 ? (
            <p>No hay nada que mostrar</p>
          ) : (
            <ul className="card-list">
              <li className="stat-card">
                <h3>Sucursales</h3>
                <p>Total: {sucursalesData[0]?.total_sucursales}</p>
              </li>
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
