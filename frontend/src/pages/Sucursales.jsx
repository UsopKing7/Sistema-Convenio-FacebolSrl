import { useParams, useLocation, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import { getInitials } from './Dashboard'
import '../styles/Dashboard.css'

export const Sucursales = () => {
  const { id } = useParams()
  const location = useLocation()
  const { nombre, correo } = location.state || {}

  const [sucursales, setSucursales] = useState([])

  useEffect(() => {
    const fetchSucursales = async (ruta) => {
      try {
        const res = await fetch(`http://localhost:3333/${ruta}/${id}`, {
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

    fetchSucursales('sucursal')
  }, [id])

  const handleLogout = async () => {
    const res = await fetch('http://localhost:3333/logout', {
      method: 'GET',
      credentials: 'include'
    })

    if (res.ok) {
      window.location.href = '/'
    } else {
      throw new Error('Error al cierre de sesión')
    }
  }

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
            className="nav-link"
          >
            <User2Icon className="icon" /> Usuarios
          </Link>
          <Link
            to={`/dashboard/empresas/${id}`}
            state={{ nombre, correo }}
            className="nav-link"
          >
            <Briefcase className='icon' /> Empresas
          </Link>
          <Link
            to={`/dashboard/sucursales/${id}`}
            state={{ nombre, correo }}
            className="nav-link active"
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
          <h1>Bienvenido a sucursales, {nombre || 'Usuario'}</h1>
        </header>

        <div className="module-content">
          {!Array.isArray(sucursales) || sucursales.length === 0 ? (
            <p>No hay sucursales registradas.</p>
          ) : (
            <ul className="sucursales-list">
              {sucursales.map((sucursal, index) => (
                <li key={index} className="sucursal-card">
                  <h3>{sucursal.nombre_sede}</h3>
                  <p>
                    <strong>Departamento:</strong> {sucursal.departamento}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {sucursal.ciudad}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {sucursal.direccion}
                  </p>
                  <p>
                    <strong>Horario:</strong> {sucursal.horario}
                  </p>
                  <p>
                    <strong>Estado:</strong> {sucursal.estado}
                  </p>
                </li>
              ))}
            </ul>
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
