import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Building,
  Handshake,
  LogOut,
  User2Icon,
  RefreshCcw,
  DeleteIcon,
  Plus,
  Briefcase
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
        console.log(json)

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

  const deleteUsuario = async () => {
    const res = await fetch(`http://localhost:3333/usuarios/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })

    if (res.ok) {
      alert('Usuario eliminado correctamente')
      window.location.reload()
    } else {
      throw new Error('Error al eliminar al usuario')
    }
  }

  const usuariosFiltrados = usuario.filter(
    (u) =>
      (u.nombre_usuario &&
        u.nombre_usuario.toLowerCase().includes(filtro.toLowerCase())) ||
      (u.correo && u.correo.toLowerCase().includes(filtro.toLowerCase()))
  )

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
            to={`/dashboard/empresas/${id}`}
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
                    <th>Rol</th>
                    <th>Permiso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((usuario, index) => (
                    <tr key={usuario.usuario_id || index}>
                      <td>{index + 1}</td>
                      <td>{usuario.nombre_usuario}</td>
                      <td>{usuario.correo}</td>
                      <td>{usuario.telefono}</td>
                      <td>{usuario.nombre_rol}</td>
                      <td>
                        <ul>
                          {usuario.permisos.split(', ').map((permiso, i) => (
                            <li key={i}>{permiso}</li>
                          ))}
                        </ul>
                      </td>
                                            <td className="actions-cell">
                        <Link
                          to={`/dashboard/usuario/editar/${usuario.usuario_id}`}
                          className="btn btn-action btn-icon btn-update"
                          title="Editar"
                        >
                          <RefreshCcw size={16} />
                        </Link>
                        <button
                          onClick={deleteUsuario}
                          className="btn btn-action btn-icon btn-delete"
                        >
                          <DeleteIcon size={16} />
                        </button>
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
        to={`/dashboard/usuario/crearUsuario`}
        className="floating-add-btn"
        title="Agregar usuario"
      >
        <Plus />
      </Link>
    </div>
  )
}
