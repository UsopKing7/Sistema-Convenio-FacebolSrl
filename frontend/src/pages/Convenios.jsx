import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
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
import { useEffect, useState } from 'react'
import { getInitials } from './Dashboard'
import '../styles/Dashboard.css'

export const Convenios = () => {
  const { _id } = useParams()
  const location = useLocation()
  const { nombre, correo } = location.state || {}
  const navigate = useNavigate()
  const [convenios, setConvenios] = useState([])
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const fetchConvenios = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (res.ok) {
          setConvenios(json.data)
        } else {
          setConvenios([])
        }
      } catch {
        setConvenios([])
      }
    }
    fetchConvenios('convenios')
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
  const empresasFiltrado = convenios.filter(
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
            className="nav-link"
          >
            <Building className="icon" />
            Sucursales
          </Link>
          <Link
            to={`/dashboard/convenios`}
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
          {empresasFiltrado.length === 0 ? (
            <div className="empty-state">
              <p>No hay convenios con este filtro</p>
            </div>
          ) : (
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
                    <th>accion</th>
                  </tr>
                </thead>
                <tbody>
                  {empresasFiltrado.map((convenios, index) => (
                    <tr key={convenios.id || index}>
                      <td>{index + 1}</td>
                      <td>{convenios.nombre_empresa}</td>
                      <td>{convenios.folio}</td>
                      <td>{convenios.folio_interno}</td>
                      <td>{convenios.modalidad}</td>
                      <td>{convenios.presupuesto}</td>
                      <td>
                        <span
                          className={
                            convenios.estado === 1
                              ? 'estado-activo'
                              : 'estado-inactivo'
                          }
                        >
                          {convenios.estado === 1 ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <Link
                          to={`/dashboard/convenios/UpdateConvenios/${convenios.id}`}
                          className="btn btn-action btn-icon btn-update"
                        >
                          <RefreshCcw />
                        </Link>
                        <Link
                          to={`/dashboard/convenios/DeleteConvenios/${convenios.id}`}
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
