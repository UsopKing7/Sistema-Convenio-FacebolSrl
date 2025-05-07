import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Building,
  Handshake,
  CreditCard,
  LogOut,
  User2Icon,
  Briefcase
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
  const { nombre, correo } = location.state || {}

  const [conveniosData, setConveniosData] = useState([])
  const [sucursalesData, setSucursalesData] = useState([])
  const [usuariosData, setUsuariosData] = useState([])
  const [empresasData, setEmpresasData] = useState([])

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

  useEffect(() => {
    const fetchUsuarioData = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (Array.isArray(json.data)) {
          setUsuariosData(json.data)
        } else {
          setUsuariosData([])
        }
      } catch {
        setUsuariosData([])
      }
    }
    fetchUsuarioData('inicioUsuarios')
  }, [])

  useEffect(() => {
    const fetchEmpresasData = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (Array.isArray(json.data)) {
          setEmpresasData(json.data)
        } else {
          setEmpresasData([])
        }
      } catch {
        setEmpresasData([])
      }
    }
    fetchEmpresasData('inicioEmpresas')
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
          <div className="avatar-circle" style={{ backgroundColor: nombre }}>
            {getInitials(nombre)}
          </div>
          <h2>{nombre}</h2>
          <p>{correo}</p>
        </div>
        <nav className="nav">
          <Link
            to={`/dashboard/${id}`}
            state={{ nombre, correo }}
            className="nav-link active"
          >
            <Home className="icon" /> Inicio
          </Link>
          <Link
            to={`/dashboard/usuario/${id}`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <User2Icon className="icon" /> Usuarios
          </Link>
          <Link
            to={`/dashboard/empresas`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Briefcase className="icon" /> Empresas
          </Link>
          <Link
            to={`/dashboard/sucursales/${id}`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Building className="icon" /> Sucursales
          </Link>
          <Link
            to={`/dashboard/convenios/${id}`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Handshake className="icon" /> Convenios
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
          <h1>Estadísticas de Facebol</h1>
          <p>Resumen general de Facebol</p>
        </header>

        <div className="stats-grid">
          {Object.keys(conveniosData).length === 0 ? (
            <div className="stat-card empty">
              <p>No hay datos de convenios</p>
            </div>
          ) : (
            <div className="stat-card">
              <div className="stat-icon">
                <Handshake size={24} />
              </div>
              <div className="stat-info">
                <h3>Convenios</h3>
                <p className="stat-number">
                  {conveniosData[0]?.total_convenios || 0}
                </p>
                <p className="stat-description">Convenios Registrados</p>
              </div>
            </div>
          )}
          {Object.keys(sucursalesData).length === 0 ? (
            <div className="stat-card empty">
              <p>No hay datos de sucursales</p>
            </div>
          ) : (
            <div className="stat-card">
              <div className="stat-icon">
                <Building size={24} />
              </div>
              <div className="stat-info">
                <h3>Sucursales</h3>
                <p className="stat-number">
                  {sucursalesData[0]?.total_sucursales || 0}
                </p>
                <p className="stat-description">Sucursales registradas</p>
              </div>
            </div>
          )}
          {Object.keys(usuariosData).length === 0 ? (
            <div className="stat-card empty">
              <p>No hay datos de Usuarios</p>
            </div>
          ) : (
            <div className="stat-card">
              <div className="stat-icon">
                <User2Icon size={24} />
              </div>
              <div className="stat-info">
                <h3>Usuarios</h3>
                <p className="stat-number">{usuariosData[0]?.total_usuarios}</p>
                <p className="stat-description">Usuarios registrados</p>
              </div>
            </div>
          )}

          {Object.keys(empresasData).length === 0 ? (
            <div className="stat-card empty">
              <p>No hay datos de Empresas</p>
            </div>
          ) : (
            <div className="stat-card">
              <div className="stat-icon">
                <Briefcase size={24} />
              </div>
              <div className="stat-info">
                <h3>Empresas</h3>
                <p className="stat-number">{empresasData[0]?.total_empresas}</p>
                <p className="stat-description">Empresas registradas</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
