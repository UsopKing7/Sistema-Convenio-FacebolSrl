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
import { BASE_URL } from '../config.js'

export const Usuario = () => {
  const { _id } = useParams()
  const location = useLocation()
  const { nombre, correo } = location.state || {}
  const navigate = useNavigate()
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const [usuario, setUsuarios] = useState([])
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const fetchUsusarios = async () => {
      try {
        const res = await fetch(`${BASE_URL}/usuarios?page=${pagina}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()
        if (res.ok && Array.isArray(json.data)) {
          setUsuarios(json.data)
          setTotalPaginas(json.totalPages)
        } else {
          setUsuarios([])
        }
      } catch {
        setUsuarios([])
      }
    }
    fetchUsusarios()
  }, [pagina])

  const handleLogout = async () => {
    const res = await fetch(`${BASE_URL}/logout`, {
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
      (u.nombre_usuario &&
        u.nombre_usuario.toLowerCase().includes(filtro.toLowerCase())) ||
      (u.correo && u.correo.toLowerCase().includes(filtro.toLowerCase()))
  )

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina)
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
            className="nav-link active"
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
            to={`/dashboard/sucursales`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Building className="icon" /> Sucursales
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
                      <td>{(pagina - 1) * 10 + index + 1}</td>
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
                          <RefreshCcw />
                        </Link>
                        <Link
                          to={`/dashboard/usuario/delete/${usuario.usuario_id}`}
                          className="btn btn-action btn-icon btn-delete"
                        >
                          <DeleteIcon />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination-wrapper">
                <nav className="pagination-nav" aria-label="Paginación">
                  <button
                    className="pagination-nav__arrow pagination-nav__arrow--prev"
                    onClick={() => cambiarPagina(pagina - 1)}
                    disabled={pagina === 1}
                    aria-label="Página anterior"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span>Anterior</span>
                  </button>

                  <div className="pagination-numbers">
                    {[...Array(totalPaginas)].map((_, i) => (
                      <button
                        key={i}
                        className={`pagination-number ${
                          pagina === i + 1 ? 'pagination-number--active' : ''
                        }`}
                        onClick={() => cambiarPagina(i + 1)}
                        aria-current={pagina === i + 1 ? 'page' : undefined}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className="pagination-nav__arrow pagination-nav__arrow--next"
                    onClick={() => cambiarPagina(pagina + 1)}
                    disabled={pagina === totalPaginas}
                    aria-label="Página siguiente"
                  >
                    <span>Siguiente</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
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
