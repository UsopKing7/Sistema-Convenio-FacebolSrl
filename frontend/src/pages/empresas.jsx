import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Building,
  Handshake,
  CreditCard,
  LogOut,
  User2Icon,
  Plus,
  Briefcase
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { getInitials } from './Dashboard'

export const Empresas = () => {
  const { id } = useParams()
  const location = useLocation()
  const { nombre, correo } = location.state || {}
  const navigate = useNavigate()
  const [empresas, setEmpresas] = useState([])

  useEffect(() => {
    const fetchEmpresas = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}/${id}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (res.ok && Array.isArray(json.data)) {
          setEmpresas(json.data)
        } else {
          setEmpresas([])
        }
      } catch {
        setEmpresas([])
      }
    }
    fetchEmpresas('empresas')
  }, [id])

  const handleLogout = async () => {
    const res = await fetch('http://localhost/logout', {
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
          <div className="avatar-circle" style={{ backgroundColor: nombre }}>
            {getInitials(nombre)}
          </div>
          <h2>{nombre || 'Usuario'}</h2>
          <p>{correo || 'correo@ejemplo.com'}</p>
        </div>
        <nav className="nav">
          <Link
            to={`/dashboard`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Home className="icon" /> Inicio
          </Link>
          <Link
            to={`/dashboard/usuario`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <User2Icon className="icon" /> Usuarios
          </Link>
          <Link
            to={`/dashboard/empresas`}
            state={{ nombre, correo }}
            className="nav-link active"
          >
            <Briefcase className="icon" /> Empresas
          </Link>
          <Link
            to={`/dashboard/sucursales`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Building className="icon" />
            Sucursales
          </Link>
          <Link
            to={`/dashboard/convenios`}
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
          <h1>Bienvenido a las empresas, {nombre || 'Usuario'}</h1>
        </header>

        <div className="module-content">
          {empresas.length === 0 ? (
            <p>No hay empresas registrados.</p>
          ) : (
            <ul className="convenios-list">
              {empresas.map((empresas, index) => (
                <li key={index} className="convenio-card">
                  <h3>{empresas.nombre_empresa}</h3>
                  <p><strong>representante:</strong> {empresas.representante}</p>
                  <p><strong>correo:</strong> {empresas.correo}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Link
        to={`/dashboard/usuario/crear/${id}`}
        className="floating-add-btn"
        title="Agregar usuario"
      >
        <Plus />
      </Link>
    </div>
  )
}
