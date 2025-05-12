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

export const Empresas = () => {
  const { id } = useParams()
  const location = useLocation()
  const { nombre, correo } = location.state || {}
  const navigate = useNavigate()
  const [empresas, setEmpresas] = useState([])
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    const fetchEmpresas = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}`, {
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

  const empresasFiltrado = empresas.filter(
    (u) =>
      (u.nombre_empresa &&
        u.nombre_empresa.toLowerCase().includes(filtro.toLowerCase())) ||
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
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Filtrar por nombre de la empresa o por correo"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="input-filtrar"
            />
          </div>

          {empresasFiltrado.length === 0 ? (
            <div className="empty-state">
              <p>No hay empresas con este filtro</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Representante</th>
                    <th>Celular</th>
                    <th>Correo</th>
                    <th>Nit</th>
                    <th>Fecha de creacion</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody>
                  {empresasFiltrado.map((empresas, index) => (
                    <tr key={empresas.empresas_id || index}>
                      <td>{index + 1}</td>
                      <td>{empresas.nombre_empresa}</td>
                      <td>{empresas.representante}</td>
                      <td>{empresas.celular}</td>
                      <td>{empresas.correo}</td>
                      <td>{empresas.nit}</td>
                      <td>{empresas.fecha_creacion}</td>
                      <td className="actions-cell">
                        <Link
                          className="btn btn-action btn-icon btn-update"
                        >
                          <RefreshCcw />
                        </Link>
                        <Link className="btn btn-action btn-icon btn-delete">
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
      <Link
        to={`/dashboard/empresas/crearEmpresa`}
        className="floating-add-btn"
        title="Agregar usuario"
      >
        <Plus />
      </Link>
    </div>
  )
}
