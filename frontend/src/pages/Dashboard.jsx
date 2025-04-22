import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import "./Dashboard.css"

export const getInitials = (name) => {
  if (!name) return "US"
  const parts = name.split(" ")
  let initials = ""
  for (let i = 0; i < Math.min(parts.length, 2); i++) {
    initials += parts[i].charAt(0).toUpperCase()
  }
  return initials
}

export const Dashboard = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { nombre_empresa, correo } = location.state || {}


  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3333/logout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        navigate('/')
      } else {
        throw new Error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error(error);
      alert("Error al cerrar sesión");
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <div
            className="avatar-circle"
            style={{ backgroundColor: (nombre_empresa) }}
          >
            {getInitials(nombre_empresa)}
          </div>
          <h2>{nombre_empresa || "Usuario"}</h2>
          <p>{correo || "correo@ejemplo.com"}</p>
        </div>
        <nav className="nav">
          <Link to={`/dashboard/${id}`} state={{ nombre_empresa, correo }} className="nav-link active">
            <i className="icon">🏠</i> Inicio
          </Link>
          <Link to={`/dashboard/sucursales/${id}`} state={{ nombre_empresa, correo }} className="nav-link">
          
            <i className="icon">🏢</i> Sucursales
          </Link>
          <Link to="#" className="nav-link">
            <i className="icon">🤝</i> Convenios
          </Link>
          <Link to="#" className="nav-link">
            <i className="icon">💳</i> Tarjetas
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <i className="icon">🚪</i> Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Bienvenido, {nombre_empresa || "Usuario"}</h1>
        </header>

        <div className="module-content">
        </div>
      </main>
    </div>
  )
}
