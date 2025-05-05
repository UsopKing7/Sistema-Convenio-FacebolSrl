import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Building,
  Handshake,
  CreditCard,
  LogOut,
  User2Icon,
  RefreshCcw,
  DeleteIcon,
  Plus,
  CookingPot
} from 'lucide-react'
import { getInitials } from './Dashboard'
import { useEffect, useState } from 'react'
import '../styles/Dashboard.css'

export const Usuario = () => {
  const { id } = useParams()
  const location = useLocation()
  const { nombre, correo } = location.state || {}
  const navigate = useNavigate()

  const [usuario, setUsuarios] = useState([])
  const [filtro, setFiltro] = useState('')

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
      throw new Error('Error al cierre de sesión')
    }
  }

  const usuariosFiltrados = usuario.filter(
    (u) =>
      u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      u.correo.toLowerCase().includes(filtro.toLowerCase())
  )

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <div
            className="avatar-circle"
            style={{ backgroundColor: nombre }}
          >
            {getInitials(nombre)}
          </div>
          <h2>{nombre || 'Usuario'}</h2>
          <p>{correo || 'correo@ejemplo.com'}</p>
        </div>
        <nav className="nav">
          <Link
            to={`/dashboard/${id}`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Home className="icon" /> Inicio
          </Link>
          <Link
            to={`/dashboard/usuario/${id}`}
            state={{ nombre, correo }}
            className="nav-link active"
          >
            <User2Icon className="icon" /> Usuarios
          </Link>
          <Link
            to={`/dashboard/empresas`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <CookingPot className='icon' /> Empresas
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
          <Link
            to={`/dashboard/tarjetas/${id}`}
            state={{ nombre, correo }}
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
          <h1>Bienvenido a los Usuarios, {nombre}</h1>
        </header>

        <div className="module-content">
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Filtrar por nombre o correo..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-filtrar"
            />
          </div>

          {usuariosFiltrados.length === 0 ? (
            <div className="empty-state">
              <p>No hay usuarios que coincidan con el filtro</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((usuario, index) => (
                    <tr key={usuario.id || index}>
                      <td>{index + 1}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.correo}</td>
                      <td>{usuario.telefono}</td>
                      <td className="actions-cell">
                        <Link
                          to={`/dashboard/usuario/${id}/editar/${usuario.id}`}
                          className="btn btn-action btn-icon btn-update"
                          title="Editar"
                        >
                          <RefreshCcw size={16} />
                        </Link>
                        <Link
                          to={`/dashboard/usuario/${id}/eliminar/${usuario.id}`}
                          className="btn btn-action btn-icon btn-delete"
                          title="Eliminar"
                        >
                          <DeleteIcon size={16} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
