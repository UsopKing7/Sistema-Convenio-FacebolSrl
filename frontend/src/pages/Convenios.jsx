import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { Home, Building, Handshake, CreditCard, LogOut, User2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getInitials } from './Dashboard'
import '../styles/Dashboard.css'

export const Convenios = () => {
  const { id } = useParams()
  const location = useLocation()
  const { nombre_empresa, correo } = location.state || {}
  const navigate = useNavigate()
  const [convenios, setConvenios] = useState([])

  useEffect(() => {
    const fetchConvenios = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}/${id}`, {
          method: 'GET',
          credentials: 'include'
        })

        const json = await res.json()

        if (res.ok && Array.isArray(json.data)) {
          setConvenios(json.data)
        } else {
          setConvenios([])
        }
      } catch {
        setConvenios([])
      }
    }
    fetchConvenios('convenios')
  }, [id])

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

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <div
            className="avatar-circle"
            style={{ backgroundColor: nombre_empresa }}
          >
            {getInitials(nombre_empresa)}
          </div>
          <h2>{nombre_empresa || 'Usuario'}</h2>
          <p>{correo || 'correo@ejemplo.com'}</p>
        </div>
        <nav className="nav">
          <Link
            to={`/dashboard/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link"
          >
            <Home className="icon" /> Inicio
          </Link>
          <Link
            to={`/dashboard/usuario/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link"
          >
            <User2Icon className="icon" /> Usuarios
          </Link>
          <Link
            to={`/dashboard/sucursales/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link"
          >
            <Building className="icon" />
            Sucursales
          </Link>
          <Link
            to={`/dashboard/convenios/${id}`}
            state={{ nombre_empresa, correo }}
            className="nav-link active"
          >
            <Handshake className="icon" /> Convenios
          </Link>
          <Link
            to={`/dashboard/tarjetas/${id}`}
            state={{ nombre_empresa, correo }}
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
          <h1>Bienvenido a los Convenios, {nombre_empresa || 'Usuario'}</h1>
        </header>

        <div className="module-content">
          {!Array.isArray(convenios) || convenios.length === 0 ? (
            <p>No hay convenios registrados.</p>
          ) : (
            <ul className="convenios-list">
              {convenios.map((convenio, index) => (
                <li key={index} className="convenio-card">
                  <h3>{convenio.folio}</h3>
                  <p>
                    <strong>Folio Interno:</strong> {convenio.folio_interno}
                  </p>
                  <p>
                    <strong>Estado:</strong> {convenio.estado}
                  </p>
                  <p>
                    <strong>Modalidad:</strong> {convenio.modalidad}
                  </p>
                  <p>
                    <strong>Presupuesto:</strong> $
                    {parseFloat(convenio.presupuesto).toLocaleString('es-CL')}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

      </main>
    </div>
  )
}
