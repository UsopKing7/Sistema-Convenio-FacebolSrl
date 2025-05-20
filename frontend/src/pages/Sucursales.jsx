import { useParams, useLocation, Link } from 'react-router-dom'
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
  const { nombre, correo } = location.state || {}

  const [sucursales, setSucursales] = useState([])
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const fetchSucursales = async (ruta) => {
      try {
        const res = await fetch(`${BASE_URL}/${ruta}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (res.ok && Array.isArray(json.data)) {
          setSucursales(json.data)
        } else {
          setSucursales([])
        }
      } catch {
        setSucursales([])
      }
    }

    fetchSucursales('sucursales')
  }, [])

  const handleLogout = async () => {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: 'GET',
      credentials: 'include'
    })

    if (res.ok) {
      window.location.href = '/'
    } else {
      throw new Error('Error al cierre de sesión')
    }
  }

  const sucursalFiltrado = sucursales.filter(
    (u) =>
      u.nombre_empresa &&
      u.nombre_empresa.toLowerCase().includes(filtro.toLowerCase())
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
            className="nav-link"
          >
            <Briefcase className="icon" /> Empresas
          </Link>
          <Link
            to={`/dashboard/sucursales`}
            state={{ nombre, correo }}
            className="nav-link active"
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
          <h1>Bienvenido a sucursales, {nombre || 'Usuario'}</h1>
        </header>

        <div className="module-content">
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Filtrar por sucursales"
              onChange={(e) => setFiltro(e.target.value)}
              className="input-filtrar"
            />
          </div>

          {sucursales.length === 0 ? (
            <div className="empty-state">
              <p>No hay sucursales con este filtro</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>nombre Empresa</th>
                    <th>nombre Sede</th>
                    <th>ciudad</th>
                    <th>departamento</th>
                    <th>direccion</th>
                    <th>horario</th>
                    <th>estado</th>
                    <th>accion</th>
                  </tr>
                </thead>
                <tbody>
                  {sucursalFiltrado.map((sucursales, index) => (
                    <tr key={sucursales.id || index}>
                      <td>{index + 1}</td>
                      <td>{sucursales.nombre_empresa}</td>
                      <td>{sucursales.nombre_sede}</td>
                      <td>{sucursales.ciudad}</td>
                      <td>{sucursales.departamento}</td>
                      <td>{sucursales.direccion}</td>
                      <td>{sucursales.horario}</td>
                      <td>
                        <span
                          className={
                            sucursales.estado === 1
                              ? 'estado-activo'
                              : 'estado-inactivo'
                          }
                        >
                          {sucursales.estado === 1 ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <Link
                          to={`/dashboard/sucursales/UpdateSucursal/${sucursales.id}`}
                          className="btn btn-action btn-icon btn-update"
                        >
                          <RefreshCcw />
                        </Link>
                        <Link
                          to={`/dashboard/sucursales/DeleteSucursal/${sucursales.id}`}
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
          )}
        </div>
      </main>
    </div>
  )
}
