import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Home,
  Building,
  Handshake,
  LogOut,
  User2Icon,
  Plus,
  Briefcase,
  RefreshCcw,
  DeleteIcon
} from 'lucide-react'
import { getInitials } from './Dashboard'
import '../styles/Dashboard.css'
import { BASE_URL } from '../config.js'

export const Sucursales = () => {
  const { _id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { nombre, correo } = location.state || {}

  const [sucursales, setSucursales] = useState([])
  const [filtro, setFiltro] = useState('')
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const res = await fetch(`${BASE_URL}/sucursales?page=${pagina}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (res.ok && Array.isArray(json.data)) {
          setSucursales(json.data)
          setTotalPaginas(json.totalPages || 1)
        } else {
          setSucursales([])
        }
      } catch {
        setSucursales([])
      }
    }

    fetchSucursales()
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

  const sucursalesFiltradas = sucursales.filter(
    (s) =>
      s.nombre_empresa &&
      s.nombre_empresa.toLowerCase().includes(filtro.toLowerCase())
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
            className="nav-link active"
          >
            <Building className="icon" /> Sucursales
          </Link>
          <Link
            to="/dashboard/convenios"
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
          <h1>Bienvenido a sucursales, {nombre || 'Usuario'}</h1>
        </header>

        <div className="module-content">
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Filtrar por nombre de la empresa"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-filtrar"
            />
          </div>

          {sucursalesFiltradas.length === 0 ? (
            <div className="empty-state">
              <p>No hay sucursales con este filtro</p>
            </div>
          ) : (
            <>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre Empresa</th>
                      <th>Nombre Sede</th>
                      <th>Ciudad</th>
                      <th>Departamento</th>
                      <th>Dirección</th>
                      <th>Horario</th>
                      <th>Estado</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sucursalesFiltradas.map((sucursal, index) => (
                      <tr key={sucursal.id || index}>
                        <td>{(pagina - 1) * 10 + index + 1}</td>
                        <td>{sucursal.nombre_empresa}</td>
                        <td>{sucursal.nombre_sede}</td>
                        <td>{sucursal.ciudad}</td>
                        <td>{sucursal.departamento}</td>
                        <td>{sucursal.direccion}</td>
                        <td>{sucursal.horario}</td>
                        <td>
                          <span
                            className={
                              sucursal.estado === 1
                                ? 'estado-activo'
                                : 'estado-inactivo'
                            }
                          >
                            {sucursal.estado === 1 ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <Link
                            to={`/dashboard/sucursales/UpdateSucursal/${sucursal.id}`}
                            className="btn btn-action btn-icon btn-update"
                          >
                            <RefreshCcw />
                          </Link>
                          <Link
                            to={`/dashboard/sucursales/DeleteSucursal/${sucursal.id}`}
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
