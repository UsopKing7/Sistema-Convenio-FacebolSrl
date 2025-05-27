import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Home,
  Building,
  Handshake,
  LogOut,
  User2Icon,
  Briefcase,
  RefreshCcw,
  DeleteIcon
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { getInitials } from './Dashboard'
import '../styles/Dashboard.css'
import { BASE_URL } from '../config.js'

export const Convenios = () => {
  const { _id } = useParams()
  const location = useLocation()
  const { nombre, correo } = location.state || {}
  const navigate = useNavigate()

  const [convenios, setConvenios] = useState([])
  const [filtro, setFiltro] = useState('')
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    const fetchConvenios = async () => {
      try {
        const res = await fetch(`${BASE_URL}/convenios?page=${pagina}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (res.ok && Array.isArray(json.data)) {
          setConvenios(json.data)
          setTotalPaginas(json.totalPages || 1)
        } else {
          setConvenios([])
        }
      } catch {
        setConvenios([])
      }
    }

    fetchConvenios()
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

  const conveniosFiltrados = convenios.filter(
    (c) =>
      c.nombre_empresa &&
      c.nombre_empresa.toLowerCase().includes(filtro.toLowerCase())
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
          <Link to="/dashboard" state={{ nombre, correo }} className="nav-link">
            <Home className="icon" /> Inicio
          </Link>
          <Link
            to="/dashboard/usuario"
            state={{ nombre, correo }}
            className="nav-link"
          >
            <User2Icon className="icon" /> Usuarios
          </Link>
          <Link
            to="/dashboard/empresas"
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Briefcase className="icon" /> Empresas
          </Link>
          <Link
            to="/dashboard/sucursales"
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Building className="icon" /> Sucursales
          </Link>
          <Link
            to="/dashboard/convenios"
            state={{ nombre, correo }}
            className="nav-link active"
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
          <h1>Bienvenido a los Convenios, {nombre || 'Usuario'}</h1>
        </header>

        <div className="module-content">
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Filtrar por nombre empresa"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-filtrar"
            />
          </div>

          {conveniosFiltrados.length === 0 ? (
            <div className="empty-state">
              <p>No hay convenios con este filtro</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre Empresa</th>
                      <th>Folio</th>
                      <th>Folio Interno</th>
                      <th>Modalidad</th>
                      <th>Presupuesto</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {conveniosFiltrados.map((c, index) => (
                      <tr key={c.id || index}>
                        <td>{(pagina - 1) * 10 + index + 1}</td>
                        <td>{c.nombre_empresa}</td>
                        <td>{c.folio}</td>
                        <td>{c.folio_interno}</td>
                        <td>{c.modalidad}</td>
                        <td>{c.presupuesto}</td>
                        <td>
                          <span
                            className={
                              c.estado === 1
                                ? 'estado-activo'
                                : 'estado-inactivo'
                            }
                          >
                            {c.estado === 1 ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <Link
                            to={`/dashboard/convenios/UpdateConvenios/${c.id}`}
                            className="btn btn-action btn-icon btn-update"
                          >
                            <RefreshCcw />
                          </Link>
                          <Link
                            to={`/dashboard/convenios/DeleteConvenios/${c.id}`}
                            className="btn btn-action btn-icon btn-delete"
                          >
                            <DeleteIcon />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
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
            </>
          )}
        </div>
      </main>
    </div>
  )
}
